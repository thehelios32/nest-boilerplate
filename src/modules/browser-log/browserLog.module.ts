import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrowserLogCollectionName, BrowserLogEntity, BrowserLogSchema } from './schemas/browser-log.schema';
import { BrowserLogController } from './controllers/broswer-log.controller';
import { BrowserLogService } from './services/browser-log.service';
import { MONGO_DATABASE_CONNECTION_NAME } from 'src/core/mongo-database/constants/mongo-database.constant';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: BrowserLogEntity.name,
                    schema: BrowserLogSchema,
                    collection: BrowserLogCollectionName,
                },
            ],
            MONGO_DATABASE_CONNECTION_NAME,
        ),
    ],
    controllers: [BrowserLogController],
    providers: [BrowserLogService],
    exports: [BrowserLogService],
})
export class BrowserLogModule {}
