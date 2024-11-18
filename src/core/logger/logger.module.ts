import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerDatabaseName, LoggerEntity, LoggerSchema } from './schema/logger.schema';
import { LoggerService } from './service/logger.service';
import { MONGO_DATABASE_CONNECTION_NAME } from '../mongo-database/constants/mongo-database.constant';

@Global()
@Module({
    providers: [LoggerService],
    exports: [LoggerService],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: LoggerEntity.name,
                    schema: LoggerSchema,
                    collection: LoggerDatabaseName,
                },
            ],
            MONGO_DATABASE_CONNECTION_NAME,
        ),
    ],
})
export class LoggerModule {}
