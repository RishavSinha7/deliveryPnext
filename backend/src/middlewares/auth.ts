import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader } from '../utils/auth';
import { createErrorResponse } from '../utils/helpers';
import { JWTPayload } from '../types';

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      const errorResponse = createErrorResponse(
        'Access denied',
        'No token provided'
      );
      res.status(401).json(errorResponse);
      return;
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    const errorResponse = createErrorResponse(
      'Access denied',
      'Invalid or expired token'
    );
    res.status(401).json(errorResponse);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      const errorResponse = createErrorResponse(
        'Access denied',
        'Authentication required'
      );
      res.status(401).json(errorResponse);
      return;
    }

    if (!roles.includes(req.user.role)) {
      const errorResponse = createErrorResponse(
        'Access denied',
        'Insufficient permissions'
      );
      res.status(403).json(errorResponse);
      return;
    }

    next();
  };
};

export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (token) {
      const decoded = verifyToken(token);
      req.user = decoded;
    }
    
    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};
