import { Router } from 'express';
import {
    getFavorites,
    addFavorite,
    removeFavorite,
    getPrescriptions,
    addPrescription,
    updatePrescription,
    deletePrescription,
} from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// All routes are protected
router.use(protect);

// Favorites
router.get('/favorites', getFavorites);
router.post('/favorites/:medicineId', addFavorite);
router.delete('/favorites/:medicineId', removeFavorite);

// Prescriptions
router.get('/prescriptions', getPrescriptions);
router.post('/prescriptions', addPrescription);
router.put('/prescriptions/:prescriptionId', updatePrescription);
router.delete('/prescriptions/:prescriptionId', deletePrescription);

export default router;
