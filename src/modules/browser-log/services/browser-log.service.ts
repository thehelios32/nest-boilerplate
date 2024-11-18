import { Injectable } from '@nestjs/common';
import { MongooseCrudService } from 'src/utils/helpers/services/mongoose-crud.service';
import { BrowserLogDocument, BrowserLogEntity } from '../schemas/browser-log.schema';
import { MongoDatabaseEntity } from 'src/core/mongo-database/decorators/mongo-database.decorator';
import { Model } from 'mongoose';

@Injectable()
export class BrowserLogService extends MongooseCrudService<BrowserLogDocument> {
    constructor(
        @MongoDatabaseEntity(BrowserLogEntity.name)
        browserLogModel: Model<BrowserLogDocument>,
    ) {
        super(browserLogModel);
    }
}
