import { Request, Response } from 'express';
import Medicine from '../models/Medicine.model';

// @desc    Get substitutes for a medicine
// @route   GET /api/substitutes/:medicineId
// @access  Public
export const getSubstitutes = async (req: Request, res: Response): Promise<void> => {
    try {
        const { medicineId } = req.params;

        // Get the original medicine
        const medicine = await Medicine.findById(medicineId);

        if (!medicine) {
            res.status(404).json({
                success: false,
                message: 'Medicine not found',
            });
            return;
        }

        // Find substitutes with similar composition
        const substitutes = await Medicine.find({
            _id: { $ne: medicineId },
            $or: [
                { composition: { $in: medicine.composition } },
                { genericName: medicine.genericName },
            ],
        })
            .select('-__v')
            .limit(10);

        // Calculate similarity score and sort
        const substitutesWithScore = substitutes.map((sub) => {
            const compositionMatch = sub.composition.filter((comp) =>
                medicine.composition.includes(comp)
            ).length;
            const compositionScore = (compositionMatch / medicine.composition.length) * 100;
            const priceScore = medicine.price.mrp > 0
                ? ((medicine.price.mrp - sub.price.mrp) / medicine.price.mrp) * 100
                : 0;
            const ratingScore = sub.ratings.average * 20;

            const totalScore = (compositionScore * 0.5) + (ratingScore * 0.3) + (priceScore * 0.2);

            return {
                ...sub.toObject(),
                similarityScore: Math.round(totalScore),
                priceDifference: medicine.price.mrp - sub.price.mrp,
                savings: medicine.price.mrp > sub.price.mrp
                    ? Math.round(((medicine.price.mrp - sub.price.mrp) / medicine.price.mrp) * 100)
                    : 0,
            };
        });

        // Sort by similarity score
        substitutesWithScore.sort((a, b) => b.similarityScore - a.similarityScore);

        res.status(200).json({
            success: true,
            original: medicine,
            count: substitutesWithScore.length,
            data: substitutesWithScore,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error finding substitutes',
            error: error.message,
        });
    }
};

// @desc    Compare multiple medicines
// @route   POST /api/substitutes/compare
// @access  Public
export const compareSubstitutes = async (req: Request, res: Response): Promise<void> => {
    try {
        const { medicineIds } = req.body;

        if (!medicineIds || !Array.isArray(medicineIds) || medicineIds.length < 2) {
            res.status(400).json({
                success: false,
                message: 'Please provide at least 2 medicine IDs to compare',
            });
            return;
        }

        const medicines = await Medicine.find({
            _id: { $in: medicineIds },
        });

        if (medicines.length < 2) {
            res.status(404).json({
                success: false,
                message: 'Not enough medicines found for comparison',
            });
            return;
        }

        // Create comparison data
        const comparison = {
            medicines: medicines.map((med) => ({
                id: med._id,
                name: med.name,
                genericName: med.genericName,
                manufacturer: med.manufacturer,
                price: med.price,
                composition: med.composition,
                dosageForm: med.dosageForm,
                strength: med.strength,
                ratings: med.ratings,
                availability: med.availability,
            })),
            cheapest: medicines.reduce((prev, curr) =>
                prev.price.mrp < curr.price.mrp ? prev : curr
            ),
            highestRated: medicines.reduce((prev, curr) =>
                prev.ratings.average > curr.ratings.average ? prev : curr
            ),
        };

        res.status(200).json({
            success: true,
            data: comparison,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error comparing medicines',
            error: error.message,
        });
    }
};
