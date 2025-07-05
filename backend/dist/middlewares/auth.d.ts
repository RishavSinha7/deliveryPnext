import { Request, Response, NextFunction } from 'express';
import { JWTPayload } from '../types';
export interface AuthRequest extends Request {
    user?: JWTPayload;
}
export declare const authenticate: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const authorize: (...roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const optionalAuth: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map