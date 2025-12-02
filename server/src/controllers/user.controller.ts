import { Request, Response } from 'express';
import User from '../models/User.model';
import Medicine from '../models/Medicine.model';

// @desc    Get user favorites
// @route   GET /api/users/favorites
// @access  Private
export const getFavorites = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?.id).populate('favorites');

        res.status(200).json({
            success: true,
            count: user?.favorites.length || 0,
            data: user?.favorites || [],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching favorites',
            error: error.message,
        });
    }
};

// @desc    Add medicine to favorites
// @route   POST /api/users/favorites/:medicineId
// @access  Private
export const addFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
        const { medicineId } = req.params;

        // Check if medicine exists
        const medicine = await Medicine.findById(medicineId);
        if (!medicine) {
            res.status(404).json({
                success: false,
                message: 'Medicine not found',
            });
            return;
        }

        const user = await User.findById(req.user?.id);

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }

        // Check if already in favorites
        if (user.favorites.includes(medicineId as any)) {
            res.status(400).json({
                success: false,
                message: 'Medicine already in favorites',
            });
            return;
        }

        user.favorites.push(medicineId as any);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Medicine added to favorites',
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error adding favorite',
            error: error.message,
        });
    }
};

// @desc    Remove medicine from favorites
// @route   DELETE /api/users/favorites/:medicineId
// @access  Private
export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
        const { medicineId } = req.params;

        const user = await User.findById(req.user?.id);

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }

        user.favorites = user.favorites.filter(
            (fav) => fav.toString() !== medicineId
        );
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Medicine removed from favorites',
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error removing favorite',
            error: error.message,
        });
    }
};

// @desc    Get user prescriptions
// @route   GET /api/users/prescriptions
// @access  Private
export const getPrescriptions = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?.id).populate('prescriptions.medicine');

        res.status(200).json({
            success: true,
            count: user?.prescriptions.length || 0,
            data: user?.prescriptions || [],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching prescriptions',
            error: error.message,
        });
    }
};

// @desc    Add prescription
// @route   POST /api/users/prescriptions
// @access  Private
export const addPrescription = async (req: Request, res: Response): Promise<void> => {
    try {
        const { medicineId, dosage, frequency, startDate, endDate, notes } = req.body;

        // Check if medicine exists
        const medicine = await Medicine.findById(medicineId);
        if (!medicine) {
            res.status(404).json({
                success: false,
                message: 'Medicine not found',
            });
            return;
        }

        const user = await User.findById(req.user?.id);

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }

        user.prescriptions.push({
            medicine: medicineId,
            dosage,
            frequency,
            startDate: startDate || new Date(),
            endDate,
            notes,
        } as any);

        await user.save();

        res.status(201).json({
            success: true,
            message: 'Prescription added successfully',
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error adding prescription',
            error: error.message,
        });
    }
};

// @desc    Update prescription
// @route   PUT /api/users/prescriptions/:prescriptionId
// @access  Private
export const updatePrescription = async (req: Request, res: Response): Promise<void> => {
    try {
        const { prescriptionId } = req.params;
        const updates = req.body;

        const user = await User.findById(req.user?.id);

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }

        const prescription = user.prescriptions.id(prescriptionId);

        if (!prescription) {
            res.status(404).json({
                success: false,
                message: 'Prescription not found',
            });
            return;
        }

        Object.assign(prescription, updates);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Prescription updated successfully',
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error updating prescription',
            error: error.message,
        });
    }
};

// @desc    Delete prescription
// @route   DELETE /api/users/prescriptions/:prescriptionId
// @access  Private
export const deletePrescription = async (req: Request, res: Response): Promise<void> => {
    try {
        const { prescriptionId } = req.params;

        const user = await User.findById(req.user?.id);

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }

        user.prescriptions = user.prescriptions.filter(
            (prescription: any) => prescription._id.toString() !== prescriptionId
        );

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Prescription deleted successfully',
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error deleting prescription',
            error: error.message,
        });
    }
};
