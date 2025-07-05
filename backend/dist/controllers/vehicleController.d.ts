import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
declare class VehicleController {
    getMyVehicles(req: AuthRequest, res: Response): Promise<Response | void>;
    createVehicle(req: AuthRequest, res: Response): Promise<Response | void>;
    updateVehicle(req: AuthRequest, res: Response): Promise<Response | void>;
    deleteVehicle(req: AuthRequest, res: Response): Promise<Response | void>;
    getAllVehicles(req: AuthRequest, res: Response): Promise<Response | void>;
    verifyVehicle(req: AuthRequest, res: Response): Promise<Response | void>;
    updateVehicleStatus(req: AuthRequest, res: Response): Promise<Response | void>;
}
export declare const vehicleController: VehicleController;
export {};
//# sourceMappingURL=vehicleController.d.ts.map