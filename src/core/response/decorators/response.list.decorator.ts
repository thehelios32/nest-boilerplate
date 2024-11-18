import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ResponseListInterceptor } from '../interceptors/response.list.interceptor';
import { PostStatusInterceptor } from '../interceptors/post.status.interceptor';

export function ResponseList(): any {
  return applyDecorators(UseInterceptors(ResponseListInterceptor(), PostStatusInterceptor));
}
