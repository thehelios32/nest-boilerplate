import { DataSourceOptions } from 'typeorm';

export const TYPEORM_DATA_SOURCE_CONFIG = {
    type: process.env.TYPEORM_DATABASE_TYPE,
    schema: process.env.TYPEORM_DATABASE_SCHEMA,
    url: process.env.TYPEORM_DATABASE_URL,
    host: process.env.TYPEORM_DATABASE_HOST,
    port: parseInt(process.env.TYPEORM_DATABASE_PORT, 10) || 5432,
    username: process.env.TYPEORM_DATABASE_USERNAME,
    password: process.env.TYPEORM_DATABASE_PASSWORD,
    database: process.env.TYPEORM_DATABASE_NAME,
    synchronize: process.env.TYPEORM_DATABASE_SYNCHRONIZE === 'true',
    dropSchema: false,
    keepConnectionAlive: true,
    logging: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/database/migrations',
        subscribersDir: 'subscribers',
    },
    extra: {
        // based on https://node-postgres.com/api/pool
        // max connection pool size
        max: parseInt(process.env.TYPEORM_DATABASE_MAX_CONNECTIONS, 10) || 100,
        ssl:
            process.env.TYPEORM_DATABASE_SSL_ENABLED === 'true'
                ? {
                      rejectUnauthorized: process.env.TYPEORM_DATABASE_REJECT_UNAUTHORIZED === 'true',
                      ca: process.env.TYPEORM_DATABASE_CA ?? undefined,
                      key: process.env.TYPEORM_DATABASE_KEY ?? undefined,
                      cert: process.env.TYPEORM_DATABASE_CERT ?? undefined,
                  }
                : undefined,
    },
} as DataSourceOptions;
