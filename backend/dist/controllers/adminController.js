"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const helpers_1 = require("../utils/helpers");
const database_1 = __importDefault(require("../config/database"));
const logger_1 = __importDefault(require("../utils/logger"));
class AdminController {
    async getDashboardStats(req, res) {
        try {
            const [totalUsers, totalDrivers, totalBookings, todayBookings, activeDrivers, pendingBookings] = await Promise.all([
                database_1.default.user.count(),
                database_1.default.driverProfile.count(),
                database_1.default.booking.count(),
                database_1.default.booking.count({
                    where: {
                        createdAt: {
                            gte: new Date(new Date().setHours(0, 0, 0, 0))
                        }
                    }
                }),
                database_1.default.driverProfile.count({
                    where: { isOnline: true }
                }),
                database_1.default.booking.count({
                    where: { status: 'PENDING' }
                })
            ]);
            const stats = {
                totalUsers,
                totalDrivers,
                totalBookings,
                todayBookings,
                activeDrivers,
                pendingBookings
            };
            res.status(200).json((0, helpers_1.createSuccessResponse)('Dashboard stats retrieved successfully', stats));
        }
        catch (error) {
            logger_1.default.error('Get dashboard stats error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getAnalytics(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Analytics functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Get analytics error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getBookingReport(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Booking report functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Get booking report error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getEarningsReport(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Earnings report functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Get earnings report error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getDriverReport(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Driver report functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Get driver report error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getSystemHealth(req, res) {
        try {
            const health = {
                status: 'healthy',
                database: 'connected',
                uptime: process.uptime(),
                memory: process.memoryUsage(),
                timestamp: new Date().toISOString()
            };
            res.status(200).json((0, helpers_1.createSuccessResponse)('System health retrieved successfully', health));
        }
        catch (error) {
            logger_1.default.error('Get system health error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async createBackup(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Backup functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Create backup error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
}
exports.adminController = new AdminController();
//# sourceMappingURL=adminController.js.map