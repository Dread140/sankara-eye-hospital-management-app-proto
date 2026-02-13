import { Router } from 'express';
import { getDashboard } from '../controllers/dashboardController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/', authenticate, authorize('admin'), getDashboard);

export default router;
