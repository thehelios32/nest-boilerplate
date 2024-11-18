import { Injectable, NestInterceptor, ExecutionContext, CallHandler, mixin, Type } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { IResponse } from '../response.interface';
import { checkHttpStatus } from '../../../utils/helpers/functions/check-http.func';
import { IRequestApp } from 'src/utils/interfaces/request.interface';
import { MessageService } from 'src/core/message/service/message.service';
import { IMessage } from 'src/core/message/message.interface';

export function ResponseDefaultInterceptor(message?: string): Type<NestInterceptor> {
    @Injectable()
    class MixinResponseDefaultInterceptor implements NestInterceptor<Promise<any>> {
        constructor(private readonly messageService: MessageService) {}
        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<Promise<any> | string>> {
            if (context.getType() === 'http') {
                return next.handle().pipe(
                    map(async (responseData: Promise<Record<string, any>>) => {
                        const ctx: HttpArgumentsHost = context.switchToHttp();
                        const response: Response = ctx.getResponse();
                        const success = checkHttpStatus(response.statusCode);
                        const resData = (await responseData) as IResponse;

                        const { customLang } = ctx.getRequest<IRequestApp>();
                        const customLanguages = customLang ? customLang.split(',') : [];
                        const resMessage: string | IMessage = await this.messageService.get(message, {
                            customLanguages,
                        });
                        if (resData) {
                            const { ...data } = resData;

                            return {
                                success,
                                message: resMessage,
                                data,
                            };
                        }
                        return {
                            success,
                            message: resMessage,
                        };
                    }),
                );
            }

            return next.handle();
        }
    }

    return mixin(MixinResponseDefaultInterceptor);
}
