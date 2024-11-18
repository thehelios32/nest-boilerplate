import { ENUM_REQUEST_METHOD } from 'src/utils/constants/request.constant';
import { ENUM_LOGGER_LEVEL } from './logger.constant';

export interface ILogger {
    description: string;
    requestId?: string;
    method: ENUM_REQUEST_METHOD;
    tags?: string[];
    params?: Record<string, any>;
    bodies?: Record<string, any>;
    statusCode?: number;
}

export interface ILoggerOptions {
    description?: string;
    tags?: string[];
    level?: ENUM_LOGGER_LEVEL;
}
