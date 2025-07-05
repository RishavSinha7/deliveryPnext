"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = require("../controllers/bookingController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.use(auth_1.authenticate);
router.post('/', bookingController_1.bookingController.createBooking);
router.get('/my-bookings', bookingController_1.bookingController.getMyBookings);
router.get('/:id', bookingController_1.bookingController.getBookingById);
router.put('/:id/cancel', bookingController_1.bookingController.cancelBooking);
router.get('/driver/available', (0, auth_1.authorize)('DRIVER'), bookingController_1.bookingController.getAvailableBookings);
router.put('/:id/accept', (0, auth_1.authorize)('DRIVER'), bookingController_1.bookingController.acceptBooking);
router.put('/:id/start', (0, auth_1.authorize)('DRIVER'), bookingController_1.bookingController.startTrip);
router.put('/:id/complete', (0, auth_1.authorize)('DRIVER'), bookingController_1.bookingController.completeTrip);
router.put('/:id/update-location', (0, auth_1.authorize)('DRIVER'), bookingController_1.bookingController.updateLocation);
router.get('/', (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), bookingController_1.bookingController.getAllBookings);
router.put('/:id/assign-driver', (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), bookingController_1.bookingController.assignDriver);
router.put('/:id/status', (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), bookingController_1.bookingController.updateBookingStatus);
exports.default = router;
//# sourceMappingURL=bookings.js.map