import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
declare class BookingController {
    createBooking(req: AuthRequest, res: Response): Promise<Response | void>;
    getMyBookings(req: AuthRequest, res: Response): Promise<Response | void>;
    getBookingById(req: AuthRequest, res: Response): Promise<Response | void>;
    cancelBooking(req: AuthRequest, res: Response): Promise<Response | void>;
    getAvailableBookings(req: AuthRequest, res: Response): Promise<Response | void>;
    acceptBooking(req: AuthRequest, res: Response): Promise<Response | void>;
    startTrip(req: AuthRequest, res: Response): Promise<Response | void>;
    completeTrip(req: AuthRequest, res: Response): Promise<Response | void>;
    updateLocation(req: AuthRequest, res: Response): Promise<Response | void>;
    getAllBookings(req: AuthRequest, res: Response): Promise<Response | void>;
    assignDriver(req: AuthRequest, res: Response): Promise<Response | void>;
    updateBookingStatus(req: AuthRequest, res: Response): Promise<Response | void>;
}
export declare const bookingController: BookingController;
export {};
//# sourceMappingURL=bookingController.d.ts.map