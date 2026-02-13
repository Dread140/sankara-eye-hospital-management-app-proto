import { Router } from 'express';
import { completeTest, startTest, waitingTests } from '../controllers/testController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();
router.put('/start/:id', authenticate, authorize('admin', 'technician'), startTest);
router.put('/complete/:id', authenticate, authorize('admin', 'technician'), completeTest);
router.get('/waiting', authenticate, waitingTests);

export default router;
