"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const helpers_1 = require("../utils/helpers");
const logger_1 = __importDefault(require("../utils/logger"));
const database_1 = __importDefault(require("../config/database"));
class AuthController {
    async register(req, res) {
        try {
            const { fullName, email, phoneNumber, password, role = 'CUSTOMER' } = req.body;
            const existingUser = await database_1.default.user.findFirst({
                where: {
                    OR: [
                        { email },
                        { phoneNumber }
                    ]
                }
            });
            if (existingUser) {
                return res.status(400).json((0, helpers_1.createErrorResponse)('User already exists with this email or phone number'));
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 12);
            const user = await database_1.default.user.create({
                data: {
                    fullName,
                    email,
                    phoneNumber,
                    password: hashedPassword,
                    role,
                },
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    phoneNumber: true,
                    role: true,
                    isActive: true,
                    createdAt: true,
                }
            });
            const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, config_1.config.jwtSecret, { expiresIn: config_1.config.jwtExpire });
            logger_1.default.info(`New user registered: ${user.email}`);
            res.status(201).json((0, helpers_1.createSuccessResponse)('User registered successfully', {
                user,
                token,
            }));
        }
        catch (error) {
            logger_1.default.error('Registration error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error during registration'));
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await database_1.default.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    phoneNumber: true,
                    password: true,
                    role: true,
                    isActive: true,
                    createdAt: true,
                }
            });
            if (!user) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Invalid email or password'));
            }
            if (!user.isActive) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Account is deactivated. Please contact support.'));
            }
            const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Invalid email or password'));
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, config_1.config.jwtSecret, { expiresIn: config_1.config.jwtExpire });
            const { password: _, ...userWithoutPassword } = user;
            logger_1.default.info(`User logged in: ${user.email}`);
            res.status(200).json((0, helpers_1.createSuccessResponse)('Login successful', {
                user: userWithoutPassword,
                token,
            }));
        }
        catch (error) {
            logger_1.default.error('Login error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error during login'));
        }
    }
    async logout(req, res) {
        try {
            res.status(200).json((0, helpers_1.createSuccessResponse)('Logout successful'));
        }
        catch (error) {
            logger_1.default.error('Logout error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error during logout'));
        }
    }
    async refreshToken(req, res) {
        try {
            const { token } = req.body;
            if (!token) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Token is required'));
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
            const user = await database_1.default.user.findUnique({
                where: { id: decoded.userId },
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    phoneNumber: true,
                    role: true,
                    isActive: true,
                }
            });
            if (!user || !user.isActive) {
                return res.status(401).json((0, helpers_1.createErrorResponse)('Invalid token or user not found'));
            }
            const newToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, config_1.config.jwtSecret, { expiresIn: config_1.config.jwtExpire });
            res.status(200).json((0, helpers_1.createSuccessResponse)('Token refreshed successfully', {
                user,
                token: newToken,
            }));
        }
        catch (error) {
            logger_1.default.error('Token refresh error:', error);
            res.status(401).json((0, helpers_1.createErrorResponse)('Invalid or expired token'));
        }
    }
    async verifyEmail(req, res) {
        try {
            const { token } = req.body;
            res.status(200).json((0, helpers_1.createSuccessResponse)('Email verification functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Email verification error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error during email verification'));
        }
    }
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const user = await database_1.default.user.findUnique({
                where: { email },
                select: { id: true, email: true }
            });
            if (!user) {
                return res.status(200).json((0, helpers_1.createSuccessResponse)('If the email exists, a reset link has been sent'));
            }
            res.status(200).json((0, helpers_1.createSuccessResponse)('If the email exists, a reset link has been sent'));
        }
        catch (error) {
            logger_1.default.error('Forgot password error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error during password reset request'));
        }
    }
    async resetPassword(req, res) {
        try {
            const { token, password } = req.body;
            res.status(200).json((0, helpers_1.createSuccessResponse)('Password reset functionality not yet implemented'));
        }
        catch (error) {
            logger_1.default.error('Reset password error:', error);
            res.status(500).json((0, helpers_1.createErrorResponse)('Internal server error during password reset'));
        }
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map