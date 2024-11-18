import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBrowserLogEntity, IRequestObject, IResponseObject } from '../interfaces/browser-log.entity.interface';
import { BaseEntityWithTimestamp } from 'src/utils/helpers/entities/base-entity-with-timestamp.helper';
import { Document } from 'mongoose';

@Schema({
    timestamps: true,
    versionKey: false,
})
export class BrowserLogEntity extends BaseEntityWithTimestamp implements IBrowserLogEntity {
    @Prop({ required: true, type: String })
    appVersion: string;
    @Prop({ required: true, type: String })
    userAgent: string;
    @Prop({ required: true, type: String })
    frontendUrl: string;
    @Prop({ required: true, type: Number })
    screenShotFileId: number;
    @Prop({ required: true, type: Object })
    request: IRequestObject;
    @Prop({ required: true, type: Object })
    response: IResponseObject;
}

export const BrowserLogCollectionName = 'browser_logs';
export const BrowserLogSchema = SchemaFactory.createForClass(BrowserLogEntity);

export type BrowserLogDocument = Document<unknown, unknown, IBrowserLogEntity>;
