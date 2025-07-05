import { Request, Response } from 'express';
declare class AuthController {
    register(req: Request, res: Response): Promise<Response | void>;
    login(req: Request, res: Response): Promise<Response | void>;
    logout(req: Request, res: Response): Promise<Response | void>;
    refreshToken(req: Request, res: Response): Promise<Response | void>;
    verifyEmail(req: Request, res: Response): Promise<Response | void>;
    forgotPassword(req: Request, res: Response): Promise<Response | void>;
    resetPassword(req: Request, res: Response): Promise<Response | void>;
}
export declare const authController: AuthController;
export {};
//# sourceMappingURL=authController.d.ts.map