import { registerAs } from '@nestjs/config';
import { TYPEORM_DATABASE_CONFIG_KEY } from '../constants/typeorm-database.constant';

export const typeormDatabaseConfig = registerAs(
    TYPEORM_DATABASE_CONFIG_KEY,
    (): Record<string, any> => ({
        url: process.env.TYPEORM_DATABASE_URL,
        type: process.env.TYPEORM_DATABASE_TYPE,
        host: process.env.TYPEORM_DATABASE_HOST,
        port: parseInt(process.env.TYPEORM_DATABASE_PORT, 10) || 5432,
        password: process.env.TYPEORM_DATABASE_PASSWORD,
        name: process.env.TYPEORM_DATABASE_NAME,
        schema: process.env.TYPEORM_DATABASE_SCHEMA,
        username: process.env.TYPEORM_DATABASE_USERNAME,
        synchronize: process.env.TYPEORM_DATABASE_SYNCHRONIZE === 'true',
        maxConnections: parseInt(process.env.TYPEORM_DATABASE_MAX_CONNECTIONS, 10) || 100,
        sslEnabled: process.env.TYPEORM_DATABASE_SSL_ENABLED === 'true',
        rejectUnauthorized: process.env.TYPEORM_DATABASE_REJECT_UNAUTHORIZED === 'true',
        ca: process.env.TYPEORM_DATABASE_CA,
        key: process.env.TYPEORM_DATABASE_KEY,
        cert: process.env.TYPEORM_DATABASE_CERT,
    }),
);
