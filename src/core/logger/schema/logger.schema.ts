import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ENUM_REQUEST_METHOD } from 'src/utils/constants/request.constant';
import { ENUM_LOGGER_LEVEL } from '../logger.constant';

@Schema({ timestamps: true, versionKey: false })
export class LoggerEntity {
    @Prop({ required: true, enum: ENUM_LOGGER_LEVEL })
    level: string;

    @Prop({ required: true, enum: ENUM_REQUEST_METHOD })
    method: string;

    @Prop({ required: false })
    requestId?: string;

    @Prop({ required: true, default: true })
    anonymous: boolean;

    @Prop({ required: true })
    description: string;

    @Prop({ required: false, type: Object })
    params?: Record<string, any>;

    @Prop({ required: false, type: Object })
    bodies?: Record<string, any>;

    @Prop({ required: false })
    statusCode?: number;

    @Prop({ required: false, default: [] })
    tags: string[];
}

export const LoggerDatabaseName = 'loggers';
export const LoggerSchema = SchemaFactory.createForClass(LoggerEntity);

export type LoggerDocument = LoggerEntity & Document;
