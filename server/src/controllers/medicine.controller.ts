import { Request, Response } from 'express';
import Medicine from '../models/Medicine.model';

// @desc    Get all medicines with pagination
// @route   GET /api/medicines
// @access  Public
export const getAllMedicines = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;

        const medicines = await Medicine.find()
            .select('-__v')
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 });

        const total = await Medicine.countDocuments();

        res.status(200).json({
            success: true,
            count: medicines.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: medicines,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching medicines',
            error: error.message,
        });
    }
};

// @desc    Get medicine by ID
// @route   GET /api/medicines/:id
// @access  Public
export const getMedicineById = async (req: Request, res: Response): Promise<void> => {
    try {
        const medicine = await Medicine.findById(req.params.id);

        if (!medicine) {
            res.status(404).json({
                success: false,
                message: 'Medicine not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: medicine,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching medicine',
            error: error.message,
        });
    }
};

// @desc    Search medicines
// @route   GET /api/medicines/search?q=query
// @access  Public
export const searchMedicines = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = req.query.q as string;

        if (!query) {
            res.status(400).json({
                success: false,
                message: 'Search query is required',
            });
            return;
        }

        const medicines = await Medicine.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { genericName: { $regex: query, $options: 'i' } },
                { brandName: { $regex: query, $options: 'i' } },
                { composition: { $regex: query, $options: 'i' } },
            ],
        })
            .select('-__v')
            .limit(20);

        res.status(200).json({
            success: true,
            count: medicines.length,
            data: medicines,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error searching medicines',
            error: error.message,
        });
    }
};

// @desc    Get medicines by category
// @route   GET /api/medicines/category/:category
// @access  Public
export const getMedicinesByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category } = req.params;
        const medicines = await Medicine.find({ category })
            .select('-__v')
            .limit(50);

        res.status(200).json({
            success: true,
            count: medicines.length,
            data: medicines,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching medicines by category',
            error: error.message,
        });
    }
};

// @desc    Create new medicine
// @route   POST /api/medicines
// @access  Private/Admin
export const createMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const medicine = await Medicine.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Medicine created successfully',
            data: medicine,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'Error creating medicine',
            error: error.message,
        });
    }
};

// @desc    Update medicine
// @route   PUT /api/medicines/:id
// @access  Private/Admin
export const updateMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const medicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!medicine) {
            res.status(404).json({
                success: false,
                message: 'Medicine not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Medicine updated successfully',
            data: medicine,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'Error updating medicine',
            error: error.message,
        });
    }
};

// @desc    Delete medicine
// @route   DELETE /api/medicines/:id
// @access  Private/Admin
export const deleteMedicine = async (req: Request, res: Response): Promise<void> => {
    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id);

        if (!medicine) {
            res.status(404).json({
                success: false,
                message: 'Medicine not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Medicine deleted successfully',
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error deleting medicine',
            error: error.message,
        });
    }
};
