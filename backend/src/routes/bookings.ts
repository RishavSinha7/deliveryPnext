import express from 'express';
import { bookingController } from '../controllers/bookingController';
import { authenticate, authorize } from '../middlewares/auth';
import { validateBody, validateParams, validateQuery } from '../middlewares/validation';

const router = express.Router();

// All booking routes require authentication
router.use(authenticate);

// Customer routes
router.post('/', bookingController.createBooking);
router.get('/my-bookings', bookingController.getMyBookings);
router.get('/:id', bookingController.getBookingById);
router.put('/:id/cancel', bookingController.cancelBooking);

// Driver routes
router.get('/driver/available', authorize('DRIVER'), bookingController.getAvailableBookings);
router.put('/:id/accept', authorize('DRIVER'), bookingController.acceptBooking);
router.put('/:id/start', authorize('DRIVER'), bookingController.startTrip);
router.put('/:id/complete', authorize('DRIVER'), bookingController.completeTrip);
router.put('/:id/update-location', authorize('DRIVER'), bookingController.updateLocation);

// Admin routes
router.get('/', authorize('ADMIN', 'SUPER_ADMIN'), bookingController.getAllBookings);
router.put('/:id/assign-driver', authorize('ADMIN', 'SUPER_ADMIN'), bookingController.assignDriver);
router.put('/:id/status', authorize('ADMIN', 'SUPER_ADMIN'), bookingController.updateBookingStatus);

export default router;
