import { Router } from 'express';
import { notifySMS, notifyWhatsApp } from '../controllers/notificationController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();
router.post('/sms', authenticate, asyncHandler(notifySMS));
router.post('/whatsapp', authenticate, asyncHandler(notifyWhatsApp));

export default router;
