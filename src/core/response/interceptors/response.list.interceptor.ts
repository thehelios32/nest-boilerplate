import { Injectable, NestInterceptor, ExecutionContext, CallHandler, mixin, Type } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { IResponse } from '../response.interface';
import { checkHttpStatus } from '../../../utils/helpers/functions/check-http.func';

export function ResponseListInterceptor(): Type<NestInterceptor> {
    @Injectable()
    class MixinResponseDefaultInterceptor implements NestInterceptor<Promise<any>> {
        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<Promise<any> | string>> {
            if (context.getType() === 'http') {
                return next.handle().pipe(
                    map(async (responseData: Promise<Record<string, any>>) => {
                        const ctx: HttpArgumentsHost = context.switchToHttp();
                        const response: Response = ctx.getResponse();
                        const resStatusCode = response.statusCode;
                        const success = checkHttpStatus(resStatusCode);
                        const resData = (await responseData) as IResponse;
                        if (resData) {
                            const { total, data } = resData;

                            return {
                                success,
                                total,
                                data,
                            };
                        }
                        return {
                            success,
                            // code: resStatusCode,
                            // message: resMessage,
                        };
                    }),
                );
            }

            return next.handle();
        }
    }

    return mixin(MixinResponseDefaultInterceptor);
}
