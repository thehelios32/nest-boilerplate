import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HelperDateService } from 'src/utils/helper/services/helper.date.service';
import { IRequestApp } from 'src/utils/interfaces/request.interface';

@Injectable()
export class RequestTimestampInterceptor implements NestInterceptor<Promise<any>> {
    constructor(private readonly helperDateService: HelperDateService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<Promise<any> | string>> {
        if (context.getType() === 'http') {
            const request: IRequestApp = context.switchToHttp().getRequest();
            const { headers } = request;
            const reqTs: string = headers['x-timestamp'] as string;
            const currentTimestamp: number = this.helperDateService.timestamp();

            const newTimestamp = reqTs || `${currentTimestamp}`;
            request.headers['x-timestamp'] = newTimestamp;
            request.timestamp = newTimestamp;
        }

        return next.handle();
    }
}
