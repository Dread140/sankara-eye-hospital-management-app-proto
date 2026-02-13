import { Router } from 'express';
import { completeTest, createTest, startTest, waitingTests } from '../controllers/testController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();
router.post('/', authenticate, authorize('admin', 'technician'), asyncHandler(createTest));
router.put('/start/:id', authenticate, authorize('admin', 'technician'), asyncHandler(startTest));
router.put('/complete/:id', authenticate, authorize('admin', 'technician'), asyncHandler(completeTest));
router.get('/waiting', authenticate, asyncHandler(waitingTests));

export default router;
