import { Injectable, NestInterceptor, ExecutionContext, CallHandler, mixin, Type } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggerService } from '../service/logger.service';
import { ILoggerOptions } from '../logger.interface';
import { ENUM_LOGGER_LEVEL } from '../logger.constant';
import { IRequestApp } from 'src/utils/interfaces/request.interface';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

export function LoggerInterceptor(options?: ILoggerOptions): Type<NestInterceptor> {
    @Injectable()
    class MixinLoggerInterceptor implements NestInterceptor<Promise<any>> {
        constructor(private readonly loggerService: LoggerService) {}

        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<Promise<any> | string>> {
            if (context.getType() === 'http') {
                const ctx: HttpArgumentsHost = context.switchToHttp();
                const { method, originalUrl, id, body, params } = ctx.getRequest<IRequestApp>();
                const responseExpress = ctx.getResponse<Response>();
                return next.handle().pipe(
                    tap(async (response: Promise<Record<string, any>>) => {
                        const responseData: Record<string, any> = await response;
                        const responseStatus: number = responseExpress.statusCode;
                        const statusCode = responseData && responseData.statusCode ? responseData.statusCode : responseStatus;
                        if (options?.level === ENUM_LOGGER_LEVEL.FATAL) {
                            await this.loggerService.fatal({
                                description:
                                    options && options.description ? options.description : `Request ${method} called, url ${originalUrl}`,
                                requestId: id,
                                method,
                                params,
                                bodies: body,
                                statusCode,
                                tags: options && options.tags ? options.tags : [],
                            });
                        } else if (options?.level === ENUM_LOGGER_LEVEL.DEBUG) {
                            await this.loggerService.debug({
                                description:
                                    options && options.description ? options.description : `Request ${method} called, url ${originalUrl}`,
                                requestId: id,
                                method,
                                params,
                                bodies: body,
                                statusCode,
                                tags: options && options.tags ? options.tags : [],
                            });
                        } else if (options?.level === ENUM_LOGGER_LEVEL.WARN) {
                            await this.loggerService.warning({
                                description:
                                    options && options.description ? options.description : `Request ${method} called, url ${originalUrl}`,
                                requestId: id,
                                method,
                                params,
                                bodies: body,
                                statusCode,
                                tags: options && options.tags ? options.tags : [],
                            });
                        } else {
                            await this.loggerService.info({
                                description:
                                    options && options.description ? options.description : `Request ${method} called, url ${originalUrl}`,
                                requestId: id,
                                method: method,
                                params,
                                bodies: body,
                                statusCode,
                                tags: options && options.tags ? options.tags : [],
                            });
                        }
                    }),
                );
            }

            return next.handle();
        }
    }

    return mixin(MixinLoggerInterceptor);
}
