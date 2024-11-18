import { ExceptionFilter, Catch, ArgumentsHost, HttpException, InternalServerErrorException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';

import { IErrorException } from '../error.interface';
import { ENUM_STATUS_MESSAGES } from '../../../utils/constants/error.constant';
import { ENUM_RESPONSE_STATUS_CODE_ERROR } from 'src/core/response/response.constant';
import { checkHttpStatus } from 'src/utils/helpers/functions/check-http.func';
import { DebuggerService } from 'src/core/debugger/services/debugger.service';
import { IRequestApp } from 'src/utils/interfaces/request.interface';
import { MessageService } from 'src/core/message/service/message.service';
import { IMessage } from 'src/core/message/message.interface';

@Catch()
export class ErrorHttpFilter implements ExceptionFilter {
    constructor(
        private readonly debuggerService: DebuggerService,
        private readonly messageService: MessageService,
    ) {}

    async catch(exception: HttpException | InternalServerErrorException, host: ArgumentsHost): Promise<void> {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const request = ctx.getRequest<IRequestApp>();

        const responseExpress: Response = ctx.getResponse<Response>();
        // Debugger
        this.debuggerService.error(
            request?.id ? request.id : ErrorHttpFilter.name,
            {
                description: exception.message,
                class: request.__class,
                function: request.__function,
            },
            exception,
        );
        if (!(exception instanceof HttpException)) {
            responseExpress.status(400).json({
                success: false,
                error: {
                    code: -999,
                    message: 'Unknown error',
                },
            });

            return;
        }
        const statusHttp: number = exception.getStatus();
        const response = exception.getResponse();
        const success = checkHttpStatus(statusHttp);
        const { customLang } = request;
        const customLanguages: string[] = customLang ? customLang.split(',') : [];

        // Restructure
        try {
            if (typeof response === 'object' && ('statusCode' in response || 'code' in response) && 'message' in response) {
                const responseError = response as IErrorException;

                const { code, message, errors, statusCode, properties } = responseError;

                let rMessage: string | IMessage = await this.messageService.get(message, { customLanguages });

                if (properties) {
                    rMessage = await this.messageService.get(message, {
                        customLanguages,
                        properties,
                    });
                }

                responseExpress.status(statusHttp).json({
                    success,
                    error: {
                        code: code || statusCode || 999,
                        message: rMessage,
                        errors,
                    },
                });
            } else if (typeof response === 'string') {
                responseExpress.status(statusHttp).json({
                    success,
                    error: {
                        code: ENUM_RESPONSE_STATUS_CODE_ERROR.UNKOWN_ERROR,
                        message: response,
                    },
                });
            } else {
                const resp = response as any;
                responseExpress.status(statusHttp).json({
                    success,
                    error: {
                        code: resp?.statusCode || resp?.code || statusHttp,
                        message: ENUM_STATUS_MESSAGES[`STATUS_${statusHttp}`] ?? 'Unknown error',
                    },
                    data: response,
                });
            }
        } catch (er) {
            const resp = response as any;
            responseExpress.status(statusHttp).json({
                success,
                error: {
                    code: resp?.statusCode || resp?.code || statusHttp,
                    message: ENUM_STATUS_MESSAGES[`STATUS_${statusHttp}`] ?? 'Unknown error',
                },
                data: er,
            });
        }
    }
}
