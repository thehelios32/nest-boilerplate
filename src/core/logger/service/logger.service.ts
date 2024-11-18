import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ILogger } from '../logger.interface';
import { ENUM_LOGGER_LEVEL } from '../logger.constant';
import { LoggerDocument, LoggerEntity } from '../schema/logger.schema';
import { MongoDatabaseEntity } from 'src/core/mongo-database/decorators/mongo-database.decorator';

@Injectable()
export class LoggerService {
    constructor(
        @MongoDatabaseEntity(LoggerEntity.name)
        private readonly loggerModel: Model<LoggerDocument>,
    ) {}
    private async create(level: ENUM_LOGGER_LEVEL, payload: ILogger) {
        return this.loggerModel.create({ level, ...payload });
    }

    async info(payload: ILogger): Promise<LoggerDocument> {
        return this.create(ENUM_LOGGER_LEVEL.INFO, payload);
    }

    async debug(payload: ILogger): Promise<LoggerDocument> {
        return this.create(ENUM_LOGGER_LEVEL.DEBUG, payload);
    }

    async warning(payload: ILogger): Promise<LoggerDocument> {
        return this.create(ENUM_LOGGER_LEVEL.WARN, payload);
    }

    async fatal(payload: ILogger): Promise<LoggerDocument> {
        return this.create(ENUM_LOGGER_LEVEL.FATAL, payload);
    }
}
