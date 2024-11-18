import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import { DebuggerModule } from 'src/core/debugger/debugger.module';
import { DebuggerOptionService } from 'src/core/debugger/services/debugger.option.service';
import { MONGO_DATABASE_CONNECTION_NAME } from './mongo-database/constants/mongo-database.constant';
import { MongoDatabaseModule } from './mongo-database/mongo-database.module';
import { MongoDatabaseOptionsService } from './mongo-database/services/mongo-database.options.service';
import { Module } from '@nestjs/common';
import { ResponseModule } from './response/response.module';
import { ErrorModule } from './error/error.module';
import { MessageModule } from './message/message.module';
import { VersionModule } from './version/version.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { LoggerModule } from './logger/logger.module';
import { HelperModule } from 'src/utils/helper/helper.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        WinstonModule.forRootAsync({
            inject: [DebuggerOptionService],
            imports: [DebuggerModule],
            useFactory: (debuggerOptionsService: DebuggerOptionService) => debuggerOptionsService.createLogger(),
        }),
        MongooseModule.forRootAsync({
            connectionName: MONGO_DATABASE_CONNECTION_NAME,
            inject: [MongoDatabaseOptionsService],
            imports: [MongoDatabaseModule],
            useFactory: (databaseOptionsService: MongoDatabaseOptionsService) => databaseOptionsService.createMongooseOptions(),
        }),
        ResponseModule,
        ErrorModule,
        DebuggerModule,
        MessageModule,
        ErrorModule,
        ResponseModule,
        VersionModule,
        MiddlewareModule,
        LoggerModule,
        HelperModule,
    ],
})
export class CoreModule {}
