"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driverController_1 = require("../controllers/driverController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.use(auth_1.authenticate);
router.get('/profile', (0, auth_1.authorize)('DRIVER'), driverController_1.driverController.getProfile);
router.put('/profile', (0, auth_1.authorize)('DRIVER'), driverController_1.driverController.updateProfile);
router.put('/status', (0, auth_1.authorize)('DRIVER'), driverController_1.driverController.updateOnlineStatus);
router.get('/earnings', (0, auth_1.authorize)('DRIVER'), driverController_1.driverController.getEarnings);
router.get('/trips', (0, auth_1.authorize)('DRIVER'), driverController_1.driverController.getTrips);
router.get('/', (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), driverController_1.driverController.getAllDrivers);
router.get('/:id', (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), driverController_1.driverController.getDriverById);
router.put('/:id/verify', (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), driverController_1.driverController.verifyDriver);
router.put('/:id/status', (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), driverController_1.driverController.updateDriverStatus);
exports.default = router;
//# sourceMappingURL=drivers.js.map