import { DynamicModule, Module } from '@nestjs/common';
import { RouterMainModule } from '../router/router.main.module';
import { RouterModule } from '@nestjs/core';
import { RouterCoreModule } from 'src/router/router.core.module';

@Module({})
export class AppRouterModule {
    static register(): DynamicModule {
        return {
            module: AppRouterModule,
            controllers: [],
            providers: [],
            exports: [],
            imports: [
                RouterMainModule,
                RouterCoreModule,
                RouterModule.register([
                    {
                        path: '/',
                        module: RouterMainModule,
                    },
                    {
                        path: '/core',
                        module: RouterCoreModule,
                    },
                ]),
            ],
        };
    }
}
