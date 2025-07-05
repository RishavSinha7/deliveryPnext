import express from 'express';
import { vehicleController } from '../controllers/vehicleController';
import { authenticate, authorize } from '../middlewares/auth';
import { validateBody } from '../middlewares/validation';

const router = express.Router();

// All vehicle routes require authentication
router.use(authenticate);

// Driver routes
router.get('/my-vehicles', authorize('DRIVER'), vehicleController.getMyVehicles);
router.post('/', authorize('DRIVER'), vehicleController.createVehicle);
router.put('/:id', authorize('DRIVER'), vehicleController.updateVehicle);
router.delete('/:id', authorize('DRIVER'), vehicleController.deleteVehicle);

// Admin routes
router.get('/', authorize('ADMIN', 'SUPER_ADMIN'), vehicleController.getAllVehicles);
router.put('/:id/verify', authorize('ADMIN', 'SUPER_ADMIN'), vehicleController.verifyVehicle);
router.put('/:id/status', authorize('ADMIN', 'SUPER_ADMIN'), vehicleController.updateVehicleStatus);

export default router;
