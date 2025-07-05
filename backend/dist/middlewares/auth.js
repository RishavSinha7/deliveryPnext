"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.authorize = exports.authenticate = void 0;
const auth_1 = require("../utils/auth");
const helpers_1 = require("../utils/helpers");
const authenticate = async (req, res, next) => {
    try {
        const token = (0, auth_1.extractTokenFromHeader)(req.headers.authorization);
        if (!token) {
            const errorResponse = (0, helpers_1.createErrorResponse)('Access denied', 'No token provided');
            res.status(401).json(errorResponse);
            return;
        }
        const decoded = (0, auth_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        const errorResponse = (0, helpers_1.createErrorResponse)('Access denied', 'Invalid or expired token');
        res.status(401).json(errorResponse);
    }
};
exports.authenticate = authenticate;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            const errorResponse = (0, helpers_1.createErrorResponse)('Access denied', 'Authentication required');
            res.status(401).json(errorResponse);
            return;
        }
        if (!roles.includes(req.user.role)) {
            const errorResponse = (0, helpers_1.createErrorResponse)('Access denied', 'Insufficient permissions');
            res.status(403).json(errorResponse);
            return;
        }
        next();
    };
};
exports.authorize = authorize;
const optionalAuth = async (req, res, next) => {
    try {
        const token = (0, auth_1.extractTokenFromHeader)(req.headers.authorization);
        if (token) {
            const decoded = (0, auth_1.verifyToken)(token);
            req.user = decoded;
        }
        next();
    }
    catch (error) {
        next();
    }
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=auth.js.map