import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { LoggerInterceptor } from './interceptor/logger.interceptor';
import { ILoggerOptions } from './logger.interface';

export function Logger(options?: ILoggerOptions): any {
    return applyDecorators(UseInterceptors(LoggerInterceptor(options)));
}
