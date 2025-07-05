"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.sanitizeInput = exports.calculateEstimatedFare = exports.calculateDistance = exports.validatePhoneNumber = exports.validateEmail = exports.formatPhoneNumber = exports.generateTicketNumber = exports.generateBookingNumber = exports.generateUniqueId = exports.parsePaginationParams = exports.calculatePagination = exports.createPaginatedResponse = exports.createErrorResponse = exports.createSuccessResponse = exports.createResponse = void 0;
const createResponse = (success, message, data, error) => {
    const response = {
        success,
        message,
        timestamp: new Date().toISOString(),
    };
    if (data !== undefined) {
        response.data = data;
    }
    if (error !== undefined) {
        response.error = error;
    }
    return response;
};
exports.createResponse = createResponse;
const createSuccessResponse = (message = 'Success', data) => {
    return (0, exports.createResponse)(true, message, data);
};
exports.createSuccessResponse = createSuccessResponse;
const createErrorResponse = (message = 'Error occurred', error) => {
    return (0, exports.createResponse)(false, message, undefined, error);
};
exports.createErrorResponse = createErrorResponse;
const createPaginatedResponse = (data, pagination, message = 'Success') => {
    return {
        success: true,
        message,
        data,
        pagination,
        timestamp: new Date().toISOString(),
    };
};
exports.createPaginatedResponse = createPaginatedResponse;
const calculatePagination = (params, total) => {
    const { page, limit } = params;
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;
    return {
        page,
        limit,
        total,
        totalPages,
        hasNext,
        hasPrev,
    };
};
exports.calculatePagination = calculatePagination;
const parsePaginationParams = (query) => {
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';
    return { page, limit, sortBy, sortOrder };
};
exports.parsePaginationParams = parsePaginationParams;
const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};
exports.generateUniqueId = generateUniqueId;
const generateBookingNumber = () => {
    const prefix = 'BK';
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${prefix}${timestamp.slice(-6)}${random}`;
};
exports.generateBookingNumber = generateBookingNumber;
const generateTicketNumber = () => {
    const prefix = 'TK';
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${prefix}${timestamp.slice(-6)}${random}`;
};
exports.generateTicketNumber = generateTicketNumber;
const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `+91${cleaned}`;
    }
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
        return `+${cleaned}`;
    }
    return phone;
};
exports.formatPhoneNumber = formatPhoneNumber;
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.validateEmail = validateEmail;
const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};
exports.validatePhoneNumber = validatePhoneNumber;
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 100) / 100;
};
exports.calculateDistance = calculateDistance;
const calculateEstimatedFare = (distance, serviceType, vehicleType) => {
    const baseFares = {
        BIKE: 25,
        AUTO: 30,
        CAR: 40,
        TRUCK: 100,
        VAN: 80,
        TEMPO: 90,
    };
    const perKmRates = {
        BIKE: 8,
        AUTO: 12,
        CAR: 15,
        TRUCK: 25,
        VAN: 20,
        TEMPO: 22,
    };
    const baseFare = baseFares[vehicleType] || 30;
    const perKmRate = perKmRates[vehicleType] || 12;
    const fare = baseFare + (distance * perKmRate);
    return Math.round(fare);
};
exports.calculateEstimatedFare = calculateEstimatedFare;
const sanitizeInput = (input) => {
    return input.trim().replace(/[<>\"']/g, '');
};
exports.sanitizeInput = sanitizeInput;
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
exports.sleep = sleep;
//# sourceMappingURL=helpers.js.map