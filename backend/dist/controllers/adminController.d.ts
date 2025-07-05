import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
declare class AdminController {
    getDashboardStats(req: AuthRequest, res: Response): Promise<Response | void>;
    getAnalytics(req: AuthRequest, res: Response): Promise<Response | void>;
    getBookingReport(req: AuthRequest, res: Response): Promise<Response | void>;
    getEarningsReport(req: AuthRequest, res: Response): Promise<Response | void>;
    getDriverReport(req: AuthRequest, res: Response): Promise<Response | void>;
    getSystemHealth(req: AuthRequest, res: Response): Promise<Response | void>;
    createBackup(req: AuthRequest, res: Response): Promise<Response | void>;
}
export declare const adminController: AdminController;
export {};
//# sourceMappingURL=adminController.d.ts.map