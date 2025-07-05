"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
require("express-async-errors");
const config_1 = require("./config");
const errorHandler_1 = require("./middlewares/errorHandler");
const logger_1 = __importDefault(require("./utils/logger"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const vehicles_1 = __importDefault(require("./routes/vehicles"));
const drivers_1 = __importDefault(require("./routes/drivers"));
const admin_1 = __importDefault(require("./routes/admin"));
const app = (0, express_1.default)();
app.set('trust proxy', 1);
const limiter = (0, express_rate_limit_1.default)({
    windowMs: config_1.config.rateLimitWindowMs,
    max: config_1.config.rateLimitMaxRequests,
    message: {
        error: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use((0, helmet_1.default)());
app.use(limiter);
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3003',
        'http://localhost:3004',
        config_1.config.frontendUrl
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, compression_1.default)());
if (config_1.config.nodeEnv !== 'test') {
    app.use((0, morgan_1.default)('combined', {
        stream: {
            write: (message) => logger_1.default.info(message.trim()),
        },
    }));
}
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Delivery Partner Backend API is running',
        environment: config_1.config.nodeEnv,
        timestamp: new Date().toISOString(),
    });
});
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/bookings', bookings_1.default);
app.use('/api/vehicles', vehicles_1.default);
app.use('/api/drivers', drivers_1.default);
app.use('/api/admin', admin_1.default);
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`,
    });
});
app.use(errorHandler_1.errorHandler);
const server = app.listen(config_1.config.port, () => {
    logger_1.default.info(`🚀 Server running on port ${config_1.config.port}`);
    logger_1.default.info(`📱 Environment: ${config_1.config.nodeEnv}`);
    logger_1.default.info(`🔗 Health check: http://localhost:${config_1.config.port}/api/health`);
});
const gracefulShutdown = (signal) => {
    logger_1.default.info(`Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
        logger_1.default.info('Server closed');
        process.exit(0);
    });
};
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
exports.default = app;
//# sourceMappingURL=server.js.map