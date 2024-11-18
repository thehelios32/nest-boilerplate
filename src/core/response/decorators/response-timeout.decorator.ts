import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { ResponseTimeoutInterceptor } from '../interceptors/response.timeout.interceptor';
import { RESPONSE_CUSTOM_TIMEOUT_META_KEY } from '../response.constant';


export function ResponseTimeout(seconds: string): any {
  return applyDecorators(SetMetadata(RESPONSE_CUSTOM_TIMEOUT_META_KEY, true), UseInterceptors(ResponseTimeoutInterceptor(seconds)));
}
