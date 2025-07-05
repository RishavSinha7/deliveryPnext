"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const helpers_1 = require("../utils/helpers");
const database_1 = __importDefault(require("../config/database"));
const logger_1 = __importDefault(require("../utils/logger"));
class UserController {
    async getProfile(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Authentication required'));
            }
            const user = await database_1.default.user.findUnique({
                where: { id: req.user.userId },
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    phoneNumber: true,
                    role: true,
                    isActive: true,
                    isEmailVerified: true,
                    isPhoneVerified: true,
                    profileImage: true,
                    dateOfBirth: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });
            if (!user) {
                return res.status(404).json((0, helpers_1.createErrorResponse)('User not found'));
            }
            res.status(200).json((0, helpers_1.createSuccessResponse)('Profile retrieved successfully', user));
        }
        catch (error) {
            logger_1.default.error('Get profile error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async updateProfile(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Authentication required'));
            }
            const { fullName, email, phoneNumber, profileImage, dateOfBirth } = req.body;
            if (email || phoneNumber) {
                const existingUser = await database_1.default.user.findFirst({
                    where: {
                        AND: [
                            { id: { not: req.user.userId } },
                            {
                                OR: [
                                    ...(email ? [{ email }] : []),
                                    ...(phoneNumber ? [{ phoneNumber }] : [])
                                ]
                            }
                        ]
                    }
                });
                if (existingUser) {
                    return res.status(400).json((0, helpers_1.createErrorResponse)('Email or phone number already in use'));
                }
            }
            const updatedUser = await database_1.default.user.update({
                where: { id: req.user.userId },
                data: {
                    ...(fullName && { fullName }),
                    ...(email && { email }),
                    ...(phoneNumber && { phoneNumber }),
                    ...(profileImage && { profileImage }),
                    ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
                },
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    phoneNumber: true,
                    role: true,
                    isActive: true,
                    profileImage: true,
                    dateOfBirth: true,
                    updatedAt: true,
                }
            });
            logger_1.default.info(`User profile updated: ${updatedUser.email}`);
            res.status(200).json((0, helpers_1.createSuccessResponse)('Profile updated successfully', updatedUser));
        }
        catch (error) {
            logger_1.default.error('Update profile error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getAllUsers(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const role = req.query.role;
            const search = req.query.search;
            const skip = (page - 1) * limit;
            const where = {};
            if (role) {
                where.role = role;
            }
            if (search) {
                where.OR = [
                    { fullName: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    { phoneNumber: { contains: search } }
                ];
            }
            const [users, total] = await Promise.all([
                database_1.default.user.findMany({
                    where,
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        phoneNumber: true,
                        role: true,
                        isActive: true,
                        isEmailVerified: true,
                        isPhoneVerified: true,
                        createdAt: true,
                    },
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' }
                }),
                database_1.default.user.count({ where })
            ]);
            const totalPages = Math.ceil(total / limit);
            res.status(200).json((0, helpers_1.createSuccessResponse)('Users retrieved successfully', {
                users,
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
            logger_1.default.error('Get all users error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json((0, helpers_1.createErrorResponse)('User ID is required'));
            }
            const user = await database_1.default.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    phoneNumber: true,
                    role: true,
                    isActive: true,
                    isEmailVerified: true,
                    isPhoneVerified: true,
                    profileImage: true,
                    dateOfBirth: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });
            if (!user) {
                return res.status(404).json((0, helpers_1.createErrorResponse)('User not found'));
            }
            res.status(200).json((0, helpers_1.createSuccessResponse)('User retrieved successfully', user));
        }
        catch (error) {
            logger_1.default.error('Get user by ID error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async updateUserStatus(req, res) {
        try {
            const { id } = req.params;
            const { isActive } = req.body;
            if (!id) {
                return res.status(400).json((0, helpers_1.createErrorResponse)('User ID is required'));
            }
            const user = await database_1.default.user.update({
                where: { id },
                data: { isActive },
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    isActive: true,
                }
            });
            logger_1.default.info(`User status updated: ${user.email} - Active: ${user.isActive}`);
            res.status(200).json((0, helpers_1.createSuccessResponse)('User status updated successfully', user));
        }
        catch (error) {
            logger_1.default.error('Update user status error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json((0, helpers_1.createErrorResponse)('User ID is required'));
            }
            const user = await database_1.default.user.findUnique({
                where: { id },
                select: { id: true, email: true, role: true }
            });
            if (!user) {
                return res.status(404).json((0, helpers_1.createErrorResponse)('User not found'));
            }
            if (user.role === 'SUPER_ADMIN') {
                return res.status(403).json((0, helpers_1.createErrorResponse)('Cannot delete super admin user'));
            }
            await database_1.default.user.delete({
                where: { id }
            });
            logger_1.default.info(`User deleted: ${user.email}`);
            res.status(200).json((0, helpers_1.createSuccessResponse)('User deleted successfully'));
        }
        catch (error) {
            logger_1.default.error('Delete user error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error'));
        }
    }
}
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map