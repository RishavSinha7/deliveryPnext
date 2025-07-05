"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = exports.paginationSchema = exports.verifyEmailSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.registerSchema = exports.createBookingSchema = exports.updateVehicleSchema = exports.createVehicleSchema = exports.updateDriverProfileSchema = exports.createDriverProfileSchema = exports.loginSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    fullName: joi_1.default.string().min(2).max(100).required().messages({
        'string.min': 'Full name must be at least 2 characters long',
        'string.max': 'Full name cannot exceed 100 characters',
        'any.required': 'Full name is required',
    }),
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
    }),
    phoneNumber: joi_1.default.string()
        .pattern(/^(\+91|91)?[6-9]\d{9}$/)
        .required()
        .messages({
        'string.pattern.base': 'Please provide a valid Indian phone number',
        'any.required': 'Phone number is required',
    }),
    password: joi_1.default.string().min(8).max(128).required().messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password cannot exceed 128 characters',
        'any.required': 'Password is required',
    }),
    role: joi_1.default.string().valid('CUSTOMER', 'DRIVER', 'ADMIN').default('CUSTOMER'),
});
exports.updateUserSchema = joi_1.default.object({
    fullName: joi_1.default.string().min(2).max(100).messages({
        'string.min': 'Full name must be at least 2 characters long',
        'string.max': 'Full name cannot exceed 100 characters',
    }),
    email: joi_1.default.string().email().messages({
        'string.email': 'Please provide a valid email address',
    }),
    phoneNumber: joi_1.default.string()
        .pattern(/^(\+91|91)?[6-9]\d{9}$/)
        .messages({
        'string.pattern.base': 'Please provide a valid Indian phone number',
    }),
    profileImage: joi_1.default.string().uri().messages({
        'string.uri': 'Profile image must be a valid URL',
    }),
    dateOfBirth: joi_1.default.date().max('now').messages({
        'date.max': 'Date of birth cannot be in the future',
    }),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
    }),
    password: joi_1.default.string().required().messages({
        'any.required': 'Password is required',
    }),
});
exports.createDriverProfileSchema = joi_1.default.object({
    aadhaarNumber: joi_1.default.string()
        .pattern(/^\d{12}$/)
        .required()
        .messages({
        'string.pattern.base': 'Aadhaar number must be exactly 12 digits',
        'any.required': 'Aadhaar number is required',
    }),
    licenseNumber: joi_1.default.string().min(5).max(20).required().messages({
        'string.min': 'License number must be at least 5 characters',
        'string.max': 'License number cannot exceed 20 characters',
        'any.required': 'License number is required',
    }),
    experienceYears: joi_1.default.number().min(0).max(50).required().messages({
        'number.min': 'Experience cannot be negative',
        'number.max': 'Experience cannot exceed 50 years',
        'any.required': 'Experience years is required',
    }),
    address: joi_1.default.string().min(10).max(500).messages({
        'string.min': 'Address must be at least 10 characters',
        'string.max': 'Address cannot exceed 500 characters',
    }),
    city: joi_1.default.string().min(2).max(100).messages({
        'string.min': 'City must be at least 2 characters',
        'string.max': 'City cannot exceed 100 characters',
    }),
    state: joi_1.default.string().min(2).max(100).messages({
        'string.min': 'State must be at least 2 characters',
        'string.max': 'State cannot exceed 100 characters',
    }),
    pincode: joi_1.default.string()
        .pattern(/^\d{6}$/)
        .messages({
        'string.pattern.base': 'Pincode must be exactly 6 digits',
    }),
    emergencyContactName: joi_1.default.string().min(2).max(100).messages({
        'string.min': 'Emergency contact name must be at least 2 characters',
        'string.max': 'Emergency contact name cannot exceed 100 characters',
    }),
    emergencyContactNumber: joi_1.default.string()
        .pattern(/^(\+91|91)?[6-9]\d{9}$/)
        .messages({
        'string.pattern.base': 'Please provide a valid Indian phone number',
    }),
    languagesSpoken: joi_1.default.string().max(200).messages({
        'string.max': 'Languages spoken cannot exceed 200 characters',
    }),
});
exports.updateDriverProfileSchema = joi_1.default.object({
    aadhaarNumber: joi_1.default.string()
        .pattern(/^\d{12}$/)
        .messages({
        'string.pattern.base': 'Aadhaar number must be exactly 12 digits',
    }),
    licenseNumber: joi_1.default.string().min(5).max(20).messages({
        'string.min': 'License number must be at least 5 characters',
        'string.max': 'License number cannot exceed 20 characters',
    }),
    experienceYears: joi_1.default.number().min(0).max(50).messages({
        'number.min': 'Experience cannot be negative',
        'number.max': 'Experience cannot exceed 50 years',
    }),
    address: joi_1.default.string().min(10).max(500).messages({
        'string.min': 'Address must be at least 10 characters',
        'string.max': 'Address cannot exceed 500 characters',
    }),
    city: joi_1.default.string().min(2).max(100).messages({
        'string.min': 'City must be at least 2 characters',
        'string.max': 'City cannot exceed 100 characters',
    }),
    state: joi_1.default.string().min(2).max(100).messages({
        'string.min': 'State must be at least 2 characters',
        'string.max': 'State cannot exceed 100 characters',
    }),
    pincode: joi_1.default.string()
        .pattern(/^\d{6}$/)
        .messages({
        'string.pattern.base': 'Pincode must be exactly 6 digits',
    }),
    emergencyContactName: joi_1.default.string().min(2).max(100).messages({
        'string.min': 'Emergency contact name must be at least 2 characters',
        'string.max': 'Emergency contact name cannot exceed 100 characters',
    }),
    emergencyContactNumber: joi_1.default.string()
        .pattern(/^(\+91|91)?[6-9]\d{9}$/)
        .messages({
        'string.pattern.base': 'Please provide a valid Indian phone number',
    }),
    languagesSpoken: joi_1.default.string().max(200).messages({
        'string.max': 'Languages spoken cannot exceed 200 characters',
    }),
});
exports.createVehicleSchema = joi_1.default.object({
    vehicleType: joi_1.default.string()
        .valid('BIKE', 'AUTO', 'CAR', 'TRUCK', 'VAN', 'TEMPO')
        .required()
        .messages({
        'any.only': 'Vehicle type must be one of: BIKE, AUTO, CAR, TRUCK, VAN, TEMPO',
        'any.required': 'Vehicle type is required',
    }),
    vehicleNumber: joi_1.default.string()
        .pattern(/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{1,4}$/)
        .required()
        .messages({
        'string.pattern.base': 'Please provide a valid Indian vehicle number (e.g., KA01AB1234)',
        'any.required': 'Vehicle number is required',
    }),
    vehicleModel: joi_1.default.string().min(2).max(100).required().messages({
        'string.min': 'Vehicle model must be at least 2 characters',
        'string.max': 'Vehicle model cannot exceed 100 characters',
        'any.required': 'Vehicle model is required',
    }),
    yearOfManufacture: joi_1.default.string()
        .pattern(/^\d{4}$/)
        .custom((value, helpers) => {
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        if (year < 1990 || year > currentYear) {
            return helpers.error('any.invalid');
        }
        return value;
    })
        .required()
        .messages({
        'string.pattern.base': 'Year of manufacture must be a 4-digit year',
        'any.invalid': 'Year of manufacture must be between 1990 and current year',
        'any.required': 'Year of manufacture is required',
    }),
    insuranceNumber: joi_1.default.string().min(5).max(50).required().messages({
        'string.min': 'Insurance number must be at least 5 characters',
        'string.max': 'Insurance number cannot exceed 50 characters',
        'any.required': 'Insurance number is required',
    }),
});
exports.updateVehicleSchema = joi_1.default.object({
    vehicleType: joi_1.default.string()
        .valid('BIKE', 'AUTO', 'CAR', 'TRUCK', 'VAN', 'TEMPO')
        .messages({
        'any.only': 'Vehicle type must be one of: BIKE, AUTO, CAR, TRUCK, VAN, TEMPO',
    }),
    vehicleNumber: joi_1.default.string()
        .pattern(/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{1,4}$/)
        .messages({
        'string.pattern.base': 'Please provide a valid Indian vehicle number (e.g., KA01AB1234)',
    }),
    vehicleModel: joi_1.default.string().min(2).max(100).messages({
        'string.min': 'Vehicle model must be at least 2 characters',
        'string.max': 'Vehicle model cannot exceed 100 characters',
    }),
    yearOfManufacture: joi_1.default.string()
        .pattern(/^\d{4}$/)
        .custom((value, helpers) => {
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        if (year < 1990 || year > currentYear) {
            return helpers.error('any.invalid');
        }
        return value;
    })
        .messages({
        'string.pattern.base': 'Year of manufacture must be a 4-digit year',
        'any.invalid': 'Year of manufacture must be between 1990 and current year',
    }),
    insuranceNumber: joi_1.default.string().min(5).max(50).messages({
        'string.min': 'Insurance number must be at least 5 characters',
        'string.max': 'Insurance number cannot exceed 50 characters',
    }),
    isActive: joi_1.default.boolean(),
});
exports.createBookingSchema = joi_1.default.object({
    serviceType: joi_1.default.string()
        .valid('BIKE_DELIVERY', 'AUTO_RIDE', 'CAR_RIDE', 'TRUCK_DELIVERY', 'PACKERS_MOVERS', 'INTERCITY')
        .required()
        .messages({
        'any.only': 'Service type must be one of the supported services',
        'any.required': 'Service type is required',
    }),
    pickupAddress: joi_1.default.string().min(10).max(500).required().messages({
        'string.min': 'Pickup address must be at least 10 characters',
        'string.max': 'Pickup address cannot exceed 500 characters',
        'any.required': 'Pickup address is required',
    }),
    pickupLatitude: joi_1.default.number().min(-90).max(90).required().messages({
        'number.min': 'Pickup latitude must be between -90 and 90',
        'number.max': 'Pickup latitude must be between -90 and 90',
        'any.required': 'Pickup latitude is required',
    }),
    pickupLongitude: joi_1.default.number().min(-180).max(180).required().messages({
        'number.min': 'Pickup longitude must be between -180 and 180',
        'number.max': 'Pickup longitude must be between -180 and 180',
        'any.required': 'Pickup longitude is required',
    }),
    pickupDateTime: joi_1.default.date().min('now').required().messages({
        'date.min': 'Pickup date and time cannot be in the past',
        'any.required': 'Pickup date and time is required',
    }),
    dropoffAddress: joi_1.default.string().min(10).max(500).required().messages({
        'string.min': 'Dropoff address must be at least 10 characters',
        'string.max': 'Dropoff address cannot exceed 500 characters',
        'any.required': 'Dropoff address is required',
    }),
    dropoffLatitude: joi_1.default.number().min(-90).max(90).required().messages({
        'number.min': 'Dropoff latitude must be between -90 and 90',
        'number.max': 'Dropoff latitude must be between -90 and 90',
        'any.required': 'Dropoff latitude is required',
    }),
    dropoffLongitude: joi_1.default.number().min(-180).max(180).required().messages({
        'number.min': 'Dropoff longitude must be between -180 and 180',
        'number.max': 'Dropoff longitude must be between -180 and 180',
        'any.required': 'Dropoff longitude is required',
    }),
    estimatedFare: joi_1.default.number().min(0).required().messages({
        'number.min': 'Estimated fare cannot be negative',
        'any.required': 'Estimated fare is required',
    }),
    notes: joi_1.default.string().max(500).allow('').messages({
        'string.max': 'Notes cannot exceed 500 characters',
    }),
    paymentMethod: joi_1.default.string()
        .valid('CASH', 'CARD', 'UPI', 'WALLET', 'NET_BANKING')
        .default('CASH')
        .messages({
        'any.only': 'Payment method must be one of: CASH, CARD, UPI, WALLET, NET_BANKING',
    }),
});
exports.registerSchema = exports.createUserSchema;
exports.forgotPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
    }),
});
exports.resetPasswordSchema = joi_1.default.object({
    token: joi_1.default.string().required().messages({
        'any.required': 'Reset token is required',
    }),
    password: joi_1.default.string().min(8).max(128).required().messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password cannot exceed 128 characters',
        'any.required': 'Password is required',
    }),
});
exports.verifyEmailSchema = joi_1.default.object({
    token: joi_1.default.string().required().messages({
        'any.required': 'Verification token is required',
    }),
});
exports.paginationSchema = joi_1.default.object({
    page: joi_1.default.number().min(1).default(1).messages({
        'number.min': 'Page number must be at least 1',
    }),
    limit: joi_1.default.number().min(1).max(100).default(10).messages({
        'number.min': 'Limit must be at least 1',
        'number.max': 'Limit cannot exceed 100',
    }),
    sortBy: joi_1.default.string().default('createdAt'),
    sortOrder: joi_1.default.string().valid('asc', 'desc').default('desc').messages({
        'any.only': 'Sort order must be either "asc" or "desc"',
    }),
});
exports.idParamSchema = joi_1.default.object({
    id: joi_1.default.string().required().messages({
        'any.required': 'ID parameter is required',
    }),
});
//# sourceMappingURL=validation.js.map