import { Router } from 'express';
import { getDashboard } from '../controllers/dashboardController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();
router.get('/', authenticate, authorize('admin'), asyncHandler(getDashboard));

export default router;
