import { Router } from 'express';
import { endConsultation, startConsultation } from '../controllers/consultationController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();
router.put('/start/:id', authenticate, authorize('admin', 'doctor'), asyncHandler(startConsultation));
router.put('/end/:id', authenticate, authorize('admin', 'doctor'), asyncHandler(endConsultation));

export default router;
