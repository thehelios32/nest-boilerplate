import { registerAs } from '@nestjs/config';
import { MONGO_DATABASE_CONFIG_KEY } from '../constants/mongo-database.constant';

export const mongoDatabaseConfig = registerAs(
    MONGO_DATABASE_CONFIG_KEY,
    (): Record<string, any> => ({
        host: process.env.MONGO_DATABASE_HOST || 'mongodb://localhost:27017',
        name: process.env.MONGO_DATABASE_NAME || 'defaultServiceNameMongoDB',
        user: process.env.MONGO_DATABASE_USER || null,
        password: process.env.MONGO_DATABASE_PASSWORD || null,
        debug: process.env.MONGO_DATABASE_DEBUG === 'true' || false,
        options: process.env.MONGO_DATABASE_OPTIONS,
    }),
);
