import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { PostStatusInterceptor } from '../interceptors/post.status.interceptor';
import { ResponseDefaultInterceptor } from '../interceptors/response.default.interceptor';


export function DecoratedPostResponse(messagePath?: string): any {
  return applyDecorators(UseInterceptors(ResponseDefaultInterceptor(messagePath), PostStatusInterceptor));
}

export function PostResponse(): any {
  return applyDecorators(UseInterceptors(PostStatusInterceptor));
}
