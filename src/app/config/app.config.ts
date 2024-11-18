import { registerAs } from '@nestjs/config';

export const appConfig = registerAs(
    'app',
    (): Record<string, any> => ({
        name: process.env.APP_NAME || 'NestJS Boilerplate',
        env: process.env.APP_ENV || 'development',
        language: process.env.APP_LANGUAGE || 'en',
        timezone: process.env.APP_TZ || 'Asia/Jakarta',
        debug: process.env.APP_DEBUG,
        http: {
            host: process.env.APP_HOST || 'localhost',
            port: Number.parseInt(process.env.APP_PORT) || 3000,
        },
        globalPrefix: '/api',
        versioning: {
            on: process.env.APP_VERSIONING === 'true' || false,
            prefix: 'v',
        },

        taskScheduleOn: process.env.APP_TASK_SCHEDULE_ON === 'true' || false,
    }),
);
