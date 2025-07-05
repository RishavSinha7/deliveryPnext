"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverController = void 0;
const helpers_1 = require("../utils/helpers");
const database_1 = __importDefault(require("../config/database"));
const logger_1 = __importDefault(require("../utils/logger"));
class DriverController {
    async getProfile(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Authentication required'));
            }
            const driverProfile = await database_1.default.driverProfile.findUnique({
                where: { userId: req.user.userId },
                include: {
                    user: {
                        select: {
                            fullName: true,
                            email: true,
                            phoneNumber: true,
                            profileImage: true
                        }
                    },
                    vehicles: true
                }
            });
            if (!driverProfile) {
                return res.status(404).json((0, helpers_1.createErrorResponse)('Driver profile not found'));
            }
            res.status(200).json((0, helpers_1.createSuccessResponse)('Driver profile retrieved successfully', driverProfile));
        }
        catch (error) {
            logger_1.default.error('Get driver profile error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async updateProfile(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Update driver profile functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Update driver profile error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async updateOnlineStatus(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Authentication required'));
            }
            const { isOnline } = req.body;
            const driverProfile = await database_1.default.driverProfile.update({
                where: { userId: req.user.userId },
                data: { isOnline },
                select: {
                    id: true,
                    isOnline: true,
                    user: {
                        select: {
                            fullName: true
                        }
                    }
                }
            });
            logger_1.default.info(`Driver ${driverProfile.user.fullName} is now ${isOnline ? 'online' : 'offline'}`);
            res.status(200).json((0, helpers_1.createSuccessResponse)('Online status updated successfully', driverProfile));
        }
        catch (error) {
            logger_1.default.error('Update online status error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getEarnings(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Get earnings functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Get earnings error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getTrips(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Authentication required'));
            }
            const driverProfile = await database_1.default.driverProfile.findUnique({
                where: { userId: req.user.userId }
            });
            if (!driverProfile) {
                return res.status(404).json((0, helpers_1.createErrorResponse)('Driver profile not found'));
            }
            const trips = await database_1.default.trip.findMany({
                where: { driverProfileId: driverProfile.id },
                include: {
                    booking: {
                        select: {
                            id: true,
                            bookingNumber: true,
                            pickupAddress: true,
                            dropoffAddress: true,
                            estimatedFare: true,
                            actualFare: true,
                            customer: {
                                select: {
                                    fullName: true,
                                    phoneNumber: true
                                }
                            }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
            res.status(200).json((0, helpers_1.createSuccessResponse)('Trips retrieved successfully', trips));
        }
        catch (error) {
            logger_1.default.error('Get trips error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getAllDrivers(req, res) {
        try {
            const drivers = await database_1.default.driverProfile.findMany({
                include: {
                    user: {
                        select: {
                            fullName: true,
                            email: true,
                            phoneNumber: true,
                            isActive: true
                        }
                    },
                    vehicles: {
                        select: {
                            vehicleType: true,
                            vehicleNumber: true,
                            isActive: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
            res.status(200).json((0, helpers_1.createSuccessResponse)('Drivers retrieved successfully', drivers));
        }
        catch (error) {
            logger_1.default.error('Get all drivers error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getDriverById(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Get driver by ID functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Get driver by ID error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async verifyDriver(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Verify driver functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Verify driver error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async updateDriverStatus(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Update driver status functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Update driver status error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
}
exports.driverController = new DriverController();
//# sourceMappingURL=driverController.js.map