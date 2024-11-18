import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RequestIdMiddleware } from './request-id/request-id.middleware';

@Module({})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
