"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const helpers_1 = require("../utils/helpers");
const database_1 = __importDefault(require("../config/database"));
const logger_1 = __importDefault(require("../utils/logger"));
class VehicleController {
    async getMyVehicles(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Authentication required'));
            }
            const driverProfile = await database_1.default.driverProfile.findUnique({
                where: { userId: req.user.userId },
                include: {
                    vehicles: true
                }
            });
            if (!driverProfile) {
                return res.status(404).json((0, helpers_1.createErrorResponse)('Driver profile not found'));
            }
            res.status(200).json((0, helpers_1.createSuccessResponse)('Vehicles retrieved successfully', driverProfile.vehicles));
        }
        catch (error) {
            logger_1.default.error('Get my vehicles error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async createVehicle(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Create vehicle functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Create vehicle error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async updateVehicle(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Update vehicle functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Update vehicle error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async deleteVehicle(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Delete vehicle functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Delete vehicle error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getAllVehicles(req, res) {
        try {
            const vehicles = await database_1.default.vehicle.findMany({
                include: {
                    driverProfile: {
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
                orderBy: { createdAt: 'desc' }
            });
            res.status(200).json((0, helpers_1.createSuccessResponse)('Vehicles retrieved successfully', vehicles));
        }
        catch (error) {
            logger_1.default.error('Get all vehicles error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async verifyVehicle(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Verify vehicle functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Verify vehicle error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async updateVehicleStatus(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Update vehicle status functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Update vehicle status error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
}
exports.vehicleController = new VehicleController();
//# sourceMappingURL=vehicleController.js.map