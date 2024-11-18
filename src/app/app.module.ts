import { Module } from '@nestjs/common';
import { CoreModule } from './../core/core.module';
import { AppRouterModule } from './app.router.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { middlewareConfig } from './config/middleware.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig, middlewareConfig],
            ignoreEnvFile: false,
            isGlobal: true,
            cache: true,
            envFilePath: ['.env'],
        }),
        CoreModule,
        AppRouterModule.register(),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
