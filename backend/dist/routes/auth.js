"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validation_1 = require("../middlewares/validation");
const validation_2 = require("../utils/validation");
const router = express_1.default.Router();
router.post('/register', (0, validation_1.validateRequest)(validation_2.registerSchema), authController_1.authController.register);
router.post('/login', (0, validation_1.validateRequest)(validation_2.loginSchema), authController_1.authController.login);
router.post('/logout', authController_1.authController.logout);
router.post('/refresh', authController_1.authController.refreshToken);
router.post('/verify-email', authController_1.authController.verifyEmail);
router.post('/forgot-password', authController_1.authController.forgotPassword);
router.post('/reset-password', authController_1.authController.resetPassword);
exports.default = router;
//# sourceMappingURL=auth.js.map