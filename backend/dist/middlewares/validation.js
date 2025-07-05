"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.validateQuery = exports.validateParams = exports.validateBody = void 0;
const helpers_1 = require("../utils/helpers");
const validateBody = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            const validationErrors = error.details.map((detail) => ({
                field: detail.path.join('.'),
                message: detail.message,
            }));
            const errorResponse = (0, helpers_1.createErrorResponse)('Validation failed', JSON.stringify(validationErrors));
            res.status(400).json(errorResponse);
            return;
        }
        req.body = value;
        next();
    };
};
exports.validateBody = validateBody;
const validateParams = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.params, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            const validationErrors = error.details.map((detail) => ({
                field: detail.path.join('.'),
                message: detail.message,
            }));
            const errorResponse = (0, helpers_1.createErrorResponse)('Invalid parameters', JSON.stringify(validationErrors));
            res.status(400).json(errorResponse);
            return;
        }
        req.params = value;
        next();
    };
};
exports.validateParams = validateParams;
const validateQuery = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            const validationErrors = error.details.map((detail) => ({
                field: detail.path.join('.'),
                message: detail.message,
            }));
            const errorResponse = (0, helpers_1.createErrorResponse)('Invalid query parameters', JSON.stringify(validationErrors));
            res.status(400).json(errorResponse);
            return;
        }
        req.query = value;
        next();
    };
};
exports.validateQuery = validateQuery;
const validateRequest = (schema) => {
    return (0, exports.validateBody)(schema);
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validation.js.map