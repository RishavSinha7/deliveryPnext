"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const index_1 = require("./index");
const globalForPrisma = globalThis;
exports.prisma = globalForPrisma.prisma ??
    new client_1.PrismaClient({
        log: index_1.config.nodeEnv === 'development' ? ['query'] : ['error'],
        datasources: {
            db: {
                url: index_1.config.databaseUrl,
            },
        },
    });
if (index_1.config.nodeEnv !== 'production') {
    globalForPrisma.prisma = exports.prisma;
}
process.on('beforeExit', async () => {
    await exports.prisma.$disconnect();
});
exports.default = exports.prisma;
//# sourceMappingURL=database.js.map