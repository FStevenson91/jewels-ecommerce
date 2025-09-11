"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = exports.databaseConfig = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
(0, dotenv_1.config)({ path: '.env.development' });
if (!process.env.DB_PORT) {
    throw new Error('DB_PORT is not defined in the environment variables');
}
exports.databaseConfig = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*.js'],
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
};
exports.default = (0, config_1.registerAs)('typeorm', () => exports.databaseConfig);
exports.connectionSource = new typeorm_1.DataSource(exports.databaseConfig);
//# sourceMappingURL=TypeOrm.config.js.map