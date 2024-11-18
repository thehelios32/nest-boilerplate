import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ResponseDefaultInterceptor } from '../interceptors/response.default.interceptor';


export function Response(messagePath: string): any {
  return applyDecorators(UseInterceptors(ResponseDefaultInterceptor(messagePath)));
}
