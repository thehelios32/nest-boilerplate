import { IBaseEntityWithTimestamp } from 'src/utils/helpers/entities/base-entity-with-timestamp.helper';

export interface IRequestObject {
    url: string;
    headers: Record<string, string>;
    method: string;
    data: any;
}

export interface IResponseObject {
    status: number;
    data: any;
    headers: Record<string, string>;
}

export interface IBrowserLogEntity extends IBaseEntityWithTimestamp {
    appVersion: string;
    userAgent: string;
    frontendUrl: string;
    screenShotFileId: number;
    request: IRequestObject;
    response: IResponseObject;
}
