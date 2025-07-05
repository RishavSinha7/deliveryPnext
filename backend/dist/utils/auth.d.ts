import { JWTPayload } from '../types';
export declare const generateToken: (payload: Omit<JWTPayload, "iat" | "exp">) => string;
export declare const verifyToken: (token: string) => JWTPayload;
export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
export declare const extractTokenFromHeader: (authHeader: string | undefined) => string | null;
export declare const generateRefreshToken: () => string;
export declare const generateResetToken: () => string;
//# sourceMappingURL=auth.d.ts.map