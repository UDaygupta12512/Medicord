import { Router } from 'express';
import { chatWithAI, getChatHistory } from '../controllers/chat.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.post('/', chatWithAI);
router.get('/history', protect, getChatHistory);

export default router;
