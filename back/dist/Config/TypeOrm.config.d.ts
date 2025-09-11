import { DataSource, DataSourceOptions } from 'typeorm';
export declare const databaseConfig: DataSourceOptions;
declare const _default: (() => import("typeorm/driver/postgres/PostgresConnectionOptions").PostgresConnectionOptions) & import("@nestjs/config").ConfigFactoryKeyHost<import("typeorm/driver/postgres/PostgresConnectionOptions").PostgresConnectionOptions>;
export default _default;
export declare const connectionSource: DataSource;
