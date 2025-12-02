import { Request, Response } from 'express';
import Medicine from '../models/Medicine.model';

// @desc    Check drug interactions
// @route   POST /api/interactions/check
// @access  Public
export const checkInteractions = async (req: Request, res: Response): Promise<void> => {
    try {
        const { medicineIds } = req.body;

        if (!medicineIds || !Array.isArray(medicineIds) || medicineIds.length < 2) {
            res.status(400).json({
                success: false,
                message: 'Please provide at least 2 medicine IDs to check interactions',
            });
            return;
        }

        const medicines = await Medicine.find({
            _id: { $in: medicineIds },
        });

        if (medicines.length < 2) {
            res.status(404).json({
                success: false,
                message: 'Not enough medicines found',
            });
            return;
        }

        // Check for interactions
        const interactions: any[] = [];
        const warnings: string[] = [];

        for (let i = 0; i < medicines.length; i++) {
            for (let j = i + 1; j < medicines.length; j++) {
                const med1 = medicines[i];
                const med2 = medicines[j];

                // Check if medicines have known interactions
                const hasInteraction = med1.interactions.some((interaction) =>
                    interaction.toLowerCase().includes(med2.genericName.toLowerCase()) ||
                    interaction.toLowerCase().includes(med2.name.toLowerCase())
                );

                if (hasInteraction) {
                    interactions.push({
                        medicine1: {
                            id: med1._id,
                            name: med1.name,
                            genericName: med1.genericName,
                        },
                        medicine2: {
                            id: med2._id,
                            name: med2.name,
                            genericName: med2.genericName,
                        },
                        severity: 'Moderate',
                        description: `Potential interaction between ${med1.name} and ${med2.name}. Consult your doctor.`,
                    });
                }

                // Check for same composition (potential duplication)
                const commonComposition = med1.composition.filter((comp) =>
                    med2.composition.includes(comp)
                );

                if (commonComposition.length > 0) {
                    warnings.push(
                        `${med1.name} and ${med2.name} contain similar active ingredients (${commonComposition.join(', ')}). Avoid taking together unless prescribed.`
                    );
                }
            }
        }

        const hasInteractions = interactions.length > 0 || warnings.length > 0;

        res.status(200).json({
            success: true,
            hasInteractions,
            interactionCount: interactions.length,
            warningCount: warnings.length,
            medicines: medicines.map((med) => ({
                id: med._id,
                name: med.name,
                genericName: med.genericName,
                composition: med.composition,
            })),
            interactions,
            warnings,
            recommendation: hasInteractions
                ? 'Potential interactions detected. Please consult with a healthcare professional before taking these medicines together.'
                : 'No known interactions detected. However, always consult your doctor before combining medications.',
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error checking interactions',
            error: error.message,
        });
    }
};
