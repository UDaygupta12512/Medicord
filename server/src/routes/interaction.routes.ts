import { Router } from 'express';
import { checkInteractions } from '../controllers/interaction.controller';

const router = Router();

router.post('/check', checkInteractions);

export default router;
