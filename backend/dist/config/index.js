"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE || '7d',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    logLevel: process.env.LOG_LEVEL || 'info',
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
    defaultPageSize: 10,
    maxPageSize: 100,
};
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`Environment variable ${envVar} is required`);
    }
});
exports.default = exports.config;
//# sourceMappingURL=index.js.map