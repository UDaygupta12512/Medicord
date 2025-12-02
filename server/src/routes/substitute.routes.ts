import { Router } from 'express';
import { getSubstitutes, compareSubstitutes } from '../controllers/substitute.controller';

const router = Router();

router.get('/:medicineId', getSubstitutes);
router.post('/compare', compareSubstitutes);

export default router;
