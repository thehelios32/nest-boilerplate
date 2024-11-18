import { Request } from 'express';
import { ENUM_REQUEST_METHOD } from '../constants/request.constant';

export interface IRequestApp extends Request {
    id?: string;
    timezone: string;
    timestamp: string;
    customLang: string;
    method: ENUM_REQUEST_METHOD;
    user?: Record<string, any>;
    version?: string;
    __class: string;
    __function: string;
}
