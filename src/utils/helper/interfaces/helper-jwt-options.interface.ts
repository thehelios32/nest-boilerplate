export interface IHelperJwtOptions {
    expiredIn: string;
    notBefore?: string;
    secretKey: string;
}

export interface IHelperJwtVerifyOptions {
    secretKey: string;
}
