import { registerAs } from '@nestjs/config';

export const helperConfig = registerAs(
    'helper',
    (): Record<string, any> => ({
        salt: {
            length: 8,
        },
        jwt: {
            secretKey: '123456',
            expirationTime: 3600 * 1000,
            notBeforeExpirationTime: 0,
        },
    }),
);
