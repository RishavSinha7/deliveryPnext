import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
declare class UserController {
    getProfile(req: AuthRequest, res: Response): Promise<Response | void>;
    updateProfile(req: AuthRequest, res: Response): Promise<Response | void>;
    getAllUsers(req: AuthRequest, res: Response): Promise<Response | void>;
    getUserById(req: AuthRequest, res: Response): Promise<Response | void>;
    updateUserStatus(req: AuthRequest, res: Response): Promise<Response | void>;
    deleteUser(req: AuthRequest, res: Response): Promise<Response | void>;
}
export declare const userController: UserController;
export {};
//# sourceMappingURL=userController.d.ts.map