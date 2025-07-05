"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.use(auth_1.authenticate);
router.use((0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'));
router.get('/dashboard', adminController_1.adminController.getDashboardStats);
router.get('/analytics', adminController_1.adminController.getAnalytics);
router.get('/reports/bookings', adminController_1.adminController.getBookingReport);
router.get('/reports/earnings', adminController_1.adminController.getEarningsReport);
router.get('/reports/drivers', adminController_1.adminController.getDriverReport);
router.get('/system/health', adminController_1.adminController.getSystemHealth);
router.post('/system/backup', adminController_1.adminController.createBackup);
exports.default = router;
//# sourceMappingURL=admin.js.map