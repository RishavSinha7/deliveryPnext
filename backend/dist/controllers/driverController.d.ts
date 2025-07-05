import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
declare class DriverController {
    getProfile(req: AuthRequest, res: Response): Promise<Response | void>;
    updateProfile(req: AuthRequest, res: Response): Promise<Response | void>;
    updateOnlineStatus(req: AuthRequest, res: Response): Promise<Response | void>;
    getEarnings(req: AuthRequest, res: Response): Promise<Response | void>;
    getTrips(req: AuthRequest, res: Response): Promise<Response | void>;
    getAllDrivers(req: AuthRequest, res: Response): Promise<Response | void>;
    getDriverById(req: AuthRequest, res: Response): Promise<Response | void>;
    verifyDriver(req: AuthRequest, res: Response): Promise<Response | void>;
    updateDriverStatus(req: AuthRequest, res: Response): Promise<Response | void>;
}
export declare const driverController: DriverController;
export {};
//# sourceMappingURL=driverController.d.ts.map