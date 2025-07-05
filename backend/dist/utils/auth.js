"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResetToken = exports.generateRefreshToken = exports.extractTokenFromHeader = exports.comparePassword = exports.hashPassword = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../config");
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.config.jwtSecret, {
        expiresIn: config_1.config.jwtExpire,
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
    }
    catch (error) {
        throw new Error('Invalid or expired token');
    }
};
exports.verifyToken = verifyToken;
const hashPassword = async (password) => {
    const saltRounds = 12;
    return await bcryptjs_1.default.hash(password, saltRounds);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashedPassword) => {
    return await bcryptjs_1.default.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
const extractTokenFromHeader = (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.substring(7);
};
exports.extractTokenFromHeader = extractTokenFromHeader;
const generateRefreshToken = () => {
    return jsonwebtoken_1.default.sign({ type: 'refresh' }, config_1.config.jwtSecret, {
        expiresIn: '30d',
    });
};
exports.generateRefreshToken = generateRefreshToken;
const generateResetToken = () => {
    return Math.random().toString(36).substr(2, 15) + Date.now().toString(36);
};
exports.generateResetToken = generateResetToken;
//# sourceMappingURL=auth.js.map