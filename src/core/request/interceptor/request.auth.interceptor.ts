import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { REQUEST_EXCLUDE_AUTH_API_META_KEY } from '../../../utils/constants/request.constant';
import { IRequestApp } from 'src/utils/interfaces/request.interface';

@Injectable()
export class RequestAuthInterceptor implements NestInterceptor<Promise<any>> {
    constructor(private readonly reflector: Reflector) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<Promise<any> | string>> {
        if (context.getType() === 'http') {
            const request: IRequestApp = context.switchToHttp().getRequest();
            const excludeAuthApi = this.reflector.get<boolean>(REQUEST_EXCLUDE_AUTH_API_META_KEY, context.getHandler());
            if (excludeAuthApi) request.user = { isActive: true };
        }

        return next.handle();
    }
}
