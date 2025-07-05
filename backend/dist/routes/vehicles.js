"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicleController_1 = require("../controllers/vehicleController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.use(auth_1.authenticate);
router.get('/my-vehicles', (0, auth_1.authorize)('DRIVER'), vehicleController_1.vehicleController.getMyVehicles);
router.post('/', (0, auth_1.authorize)('DRIVER'), vehicleController_1.vehicleController.createVehicle);
router.put('/:id', (0, auth_1.authorize)('DRIVER'), vehicleController_1.vehicleController.updateVehicle);
router.delete('/:id', (0, auth_1.authorize)('DRIVER'), vehicleController_1.vehicleController.deleteVehicle);
router.get('/', (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), vehicleController_1.vehicleController.getAllVehicles);
router.put('/:id/verify', (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), vehicleController_1.vehicleController.verifyVehicle);
router.put('/:id/status', (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), vehicleController_1.vehicleController.updateVehicleStatus);
exports.default = router;
//# sourceMappingURL=vehicles.js.map