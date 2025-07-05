"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.notFoundHandler = exports.errorHandler = void 0;
const helpers_1 = require("../utils/helpers");
const errorHandler = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal Server Error';
    let errorDetails = '';
    if (error.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
        errorDetails = error.message;
    }
    else if (error.name === 'UnauthorizedError') {
        statusCode = 401;
        message = 'Unauthorized';
    }
    else if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }
    else if (error.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }
    else if (error.name === 'PrismaClientKnownRequestError') {
        statusCode = 400;
        message = 'Database error';
        errorDetails = 'Invalid request to database';
    }
    else if (error.name === 'PrismaClientValidationError') {
        statusCode = 400;
        message = 'Database validation error';
        errorDetails = 'Invalid data provided';
    }
    console.error('Error:', {
        message: error.message,
        stack: error.stack,
        statusCode,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString(),
    });
    const errorResponse = (0, helpers_1.createErrorResponse)(message, errorDetails);
    res.status(statusCode).json(errorResponse);
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    const errorResponse = (0, helpers_1.createErrorResponse)(`Route ${req.originalUrl} not found`, 'The requested resource does not exist');
    res.status(404).json(errorResponse);
};
exports.notFoundHandler = notFoundHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=errorHandler.js.map