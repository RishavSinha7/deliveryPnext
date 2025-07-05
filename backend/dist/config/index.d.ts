export declare const config: {
    readonly port: string | 5000;
    readonly nodeEnv: string;
    readonly databaseUrl: string;
    readonly jwtSecret: string;
    readonly jwtExpire: string;
    readonly frontendUrl: string;
    readonly rateLimitWindowMs: number;
    readonly rateLimitMaxRequests: number;
    readonly logLevel: string;
    readonly maxFileSize: number;
    readonly allowedFileTypes: readonly ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    readonly defaultPageSize: 10;
    readonly maxPageSize: 100;
};
export default config;
//# sourceMappingURL=index.d.ts.map