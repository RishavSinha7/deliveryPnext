"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const helpers_1 = require("../utils/helpers");
const database_1 = __importDefault(require("../config/database"));
const logger_1 = __importDefault(require("../utils/logger"));
class BookingController {
    async createBooking(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Authentication required'));
            }
            const { serviceType, pickupAddress, pickupLatitude, pickupLongitude, dropoffAddress, dropoffLatitude, dropoffLongitude, pickupDateTime, estimatedFare, notes, paymentMethod = 'CASH' } = req.body;
            const bookingNumber = `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;
            const booking = await database_1.default.booking.create({
                data: {
                    customerId: req.user.userId,
                    bookingNumber,
                    serviceType,
                    pickupAddress,
                    pickupLatitude,
                    pickupLongitude,
                    dropoffAddress,
                    dropoffLatitude,
                    dropoffLongitude,
                    pickupDateTime: new Date(pickupDateTime),
                    estimatedFare,
                    notes,
                    paymentMethod,
                    status: 'PENDING'
                },
                include: {
                    customer: {
                        select: {
                            id: true,
                            fullName: true,
                            phoneNumber: true
                        }
                    }
                }
            });
            logger_1.default.info(`New booking created: ${booking.bookingNumber}`);
            res.status(201).json((0, helpers_1.createSuccessResponse)('Booking created successfully', booking));
        }
        catch (error) {
            logger_1.default.error('Create booking error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getMyBookings(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Authentication required'));
            }
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const status = req.query.status;
            const skip = (page - 1) * limit;
            const where = { customerId: req.user.userId };
            if (status) {
                where.status = status;
            }
            const [bookings, total] = await Promise.all([
                database_1.default.booking.findMany({
                    where,
                    include: {
                        driver: {
                            select: {
                                id: true,
                                user: {
                                    select: {
                                        fullName: true,
                                        phoneNumber: true
                                    }
                                }
                            }
                        },
                        vehicle: {
                            select: {
                                id: true,
                                vehicleType: true,
                                vehicleNumber: true
                            }
                        }
                    },
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' }
                }),
                database_1.default.booking.count({ where })
            ]);
            const totalPages = Math.ceil(total / limit);
            res.status(200).json((0, helpers_1.createSuccessResponse)('Bookings retrieved successfully', {
                bookings,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                    hasNext: page < totalPages,
                    hasPrev: page > 1,
                }
            }));
        }
        catch (error) {
            logger_1.default.error('Get my bookings error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getBookingById(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Authentication required'));
            }
            const { id } = req.params;
            if (!id) {
                return res.status(400).json((0, helpers_1.createErrorResponse)('Booking ID is required'));
            }
            const booking = await database_1.default.booking.findUnique({
                where: { id },
                include: {
                    customer: {
                        select: {
                            id: true,
                            fullName: true,
                            phoneNumber: true
                        }
                    },
                    driver: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    fullName: true,
                                    phoneNumber: true
                                }
                            }
                        }
                    },
                    vehicle: {
                        select: {
                            id: true,
                            vehicleType: true,
                            vehicleNumber: true,
                            vehicleModel: true
                        }
                    },
                    trip: true
                }
            });
            if (!booking) {
                return res.status(404).json((0, helpers_1.createErrorResponse)('Booking not found'));
            }
            if (req.user.role === 'CUSTOMER' && booking.customerId !== req.user.userId) {
                return res.status(403).json((0, helpers_1.createErrorResponse)('Access denied'));
            }
            if (req.user.role === 'DRIVER' && booking.driverId !== req.user.userId) {
                return res.status(403).json((0, helpers_1.createErrorResponse)('Access denied'));
            }
            res.status(200).json((0, helpers_1.createSuccessResponse)('Booking retrieved successfully', booking));
        }
        catch (error) {
            logger_1.default.error('Get booking by ID error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async cancelBooking(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Authentication required'));
            }
            const { id } = req.params;
            if (!id) {
                return res.status(400).json((0, helpers_1.createErrorResponse)('Booking ID is required'));
            }
            const booking = await database_1.default.booking.findUnique({
                where: { id },
                select: {
                    id: true,
                    customerId: true,
                    status: true,
                    bookingNumber: true
                }
            });
            if (!booking) {
                return res.status(404).json((0, helpers_1.createErrorResponse)('Booking not found'));
            }
            if (booking.customerId !== req.user.userId) {
                return res.status(403).json((0, helpers_1.createErrorResponse)('Access denied'));
            }
            if (!['PENDING', 'CONFIRMED', 'DRIVER_ASSIGNED'].includes(booking.status)) {
                return res.status(400).json((0, helpers_1.createErrorResponse)('Booking cannot be cancelled at this stage'));
            }
            const updatedBooking = await database_1.default.booking.update({
                where: { id },
                data: { status: 'CANCELLED' }
            });
            logger_1.default.info(`Booking cancelled: ${booking.bookingNumber}`);
            res.status(200).json((0, helpers_1.createSuccessResponse)('Booking cancelled successfully', updatedBooking));
        }
        catch (error) {
            logger_1.default.error('Cancel booking error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getAvailableBookings(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Authentication required'));
            }
            const bookings = await database_1.default.booking.findMany({
                where: {
                    status: 'PENDING',
                    driverId: null
                },
                include: {
                    customer: {
                        select: {
                            fullName: true,
                            phoneNumber: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                take: 20
            });
            res.status(200).json((0, helpers_1.createSuccessResponse)('Available bookings retrieved successfully', bookings));
        }
        catch (error) {
            logger_1.default.error('Get available bookings error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async acceptBooking(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Authentication required'));
            }
            const { id } = req.params;
            if (!id) {
                return res.status(400).json((0, helpers_1.createErrorResponse)('Booking ID is required'));
            }
            const driverProfile = await database_1.default.driverProfile.findUnique({
                where: { userId: req.user.userId }
            });
            if (!driverProfile) {
                return res.status(404).json((0, helpers_1.createErrorResponse)('Driver profile not found'));
            }
            const existingBooking = await database_1.default.booking.findUnique({
                where: { id },
                select: { id: true, status: true, driverId: true }
            });
            if (!existingBooking || existingBooking.status !== 'PENDING' || existingBooking.driverId) {
                return res.status(400).json((0, helpers_1.createErrorResponse)('Booking is not available for assignment'));
            }
            const booking = await database_1.default.booking.update({
                where: { id },
                data: {
                    driverId: driverProfile.id,
                    status: 'DRIVER_ASSIGNED'
                },
                include: {
                    customer: {
                        select: {
                            fullName: true,
                            phoneNumber: true
                        }
                    }
                }
            });
            logger_1.default.info(`Booking accepted by driver: ${booking.bookingNumber}`);
            res.status(200).json((0, helpers_1.createSuccessResponse)('Booking accepted successfully', booking));
        }
        catch (error) {
            logger_1.default.error('Accept booking error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async startTrip(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Start trip functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Start trip error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async completeTrip(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Complete trip functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Complete trip error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async updateLocation(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Update location functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Update location error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getAllBookings(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const status = req.query.status;
            const skip = (page - 1) * limit;
            const where = {};
            if (status) {
                where.status = status;
            }
            const [bookings, total] = await Promise.all([
                database_1.default.booking.findMany({
                    where,
                    include: {
                        customer: {
                            select: {
                                fullName: true,
                                phoneNumber: true
                            }
                        },
                        driver: {
                            select: {
                                user: {
                                    select: {
                                        fullName: true,
                                        phoneNumber: true
                                    }
                                }
                            }
                        }
                    },
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' }
                }),
                database_1.default.booking.count({ where })
            ]);
            const totalPages = Math.ceil(total / limit);
            res.status(200).json((0, helpers_1.createSuccessResponse)('Bookings retrieved successfully', {
                bookings,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                    hasNext: page < totalPages,
                    hasPrev: page > 1,
                }
            }));
        }
        catch (error) {
            logger_1.default.error('Get all bookings error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async assignDriver(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Assign driver functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Assign driver error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async updateBookingStatus(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Update booking status functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Update booking status error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
}
exports.bookingController = new BookingController();
//# sourceMappingURL=bookingController.js.map