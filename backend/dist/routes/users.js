"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const validation_1 = require("../middlewares/validation");
const validation_2 = require("../utils/validation");
const router = express_1.default.Router();
router.use(auth_1.authenticate);
router.get('/profile', userController_1.userController.getProfile);
router.put('/profile', (0, validation_1.validateBody)(validation_2.updateUserSchema), userController_1.userController.updateProfile);
router.get('/', (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), userController_1.userController.getAllUsers);
router.get('/:id', (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), userController_1.userController.getUserById);
router.put('/:id/status', (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), userController_1.userController.updateUserStatus);
router.delete('/:id', (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), userController_1.userController.deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map