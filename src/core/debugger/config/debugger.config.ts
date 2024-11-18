import { registerAs } from '@nestjs/config';

export const debuggerConfig = registerAs(
    'debugger',
    (): Record<string, any> => ({
        enabled: process.env.APP_DEBUG,
        http: {
            maxFiles: 5,
            maxSize: '2M',
        },
        system: {
            active: true,
            maxFiles: 5,
            maxSize: '2M',
        },
    }),
);
