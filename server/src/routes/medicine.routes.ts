import { Router } from 'express';
import {
    getAllMedicines,
    getMedicineById,
    searchMedicines,
    createMedicine,
    updateMedicine,
    deleteMedicine,
    getMedicinesByCategory,
} from '../controllers/medicine.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', getAllMedicines);
router.get('/search', searchMedicines);
router.get('/category/:category', getMedicinesByCategory);
router.get('/:id', getMedicineById);

// Protected routes (admin only)
router.post('/', protect, authorize('admin'), createMedicine);
router.put('/:id', protect, authorize('admin'), updateMedicine);
router.delete('/:id', protect, authorize('admin'), deleteMedicine);

export default router;
