import { Router } from 'express';
import { createPatient, getPatients } from '../controllers/patientController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();
router.post('/', authenticate, authorize('admin', 'receptionist'), asyncHandler(createPatient));
router.get('/', authenticate, asyncHandler(getPatients));

export default router;
