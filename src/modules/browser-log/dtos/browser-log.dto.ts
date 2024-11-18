import { IsNumber, IsObject, IsString } from 'class-validator';
import { IBrowserLogEntity, IRequestObject, IResponseObject } from '../interfaces/browser-log.entity.interface';

export class BrowserLogDto implements IBrowserLogEntity {
    @IsString()
    appVersion: string;
    @IsString()
    userAgent: string;
    @IsString()
    frontendUrl: string;
    @IsNumber()
    screenShotFileId: number;
    @IsObject()
    request: IRequestObject;
    @IsObject()
    response: IResponseObject;
}
