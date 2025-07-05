import { ApiResponse, PaginatedResponse, PaginationParams } from '../types';
export declare const createResponse: <T = any>(success: boolean, message: string, data?: T, error?: string) => ApiResponse<T>;
export declare const createSuccessResponse: <T = any>(message?: string, data?: T) => ApiResponse<T>;
export declare const createErrorResponse: (message?: string, error?: string) => ApiResponse;
export declare const createPaginatedResponse: <T = any>(data: T, pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}, message?: string) => PaginatedResponse<T>;
export declare const calculatePagination: (params: PaginationParams, total: number) => {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};
export declare const parsePaginationParams: (query: any) => PaginationParams;
export declare const generateUniqueId: () => string;
export declare const generateBookingNumber: () => string;
export declare const generateTicketNumber: () => string;
export declare const formatPhoneNumber: (phone: string) => string;
export declare const validateEmail: (email: string) => boolean;
export declare const validatePhoneNumber: (phone: string) => boolean;
export declare const calculateDistance: (lat1: number, lon1: number, lat2: number, lon2: number) => number;
export declare const calculateEstimatedFare: (distance: number, serviceType: string, vehicleType: string) => number;
export declare const sanitizeInput: (input: string) => string;
export declare const sleep: (ms: number) => Promise<void>;
//# sourceMappingURL=helpers.d.ts.map