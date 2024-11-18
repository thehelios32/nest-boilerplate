import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { MONGO_DATABASE_CONNECTION_NAME } from '../constants/mongo-database.constant';

export function MongoDatabaseConnection(
    connectionName?: string,
): (target: Record<string, any>, key: string | symbol, index?: number) => void {
    return InjectConnection(connectionName || MONGO_DATABASE_CONNECTION_NAME);
}

export function MongoDatabaseEntity(
    entity: string,
    connectionName?: string,
): (target: Record<string, any>, key: string | symbol, index?: number) => void {
    return InjectModel(entity, connectionName || MONGO_DATABASE_CONNECTION_NAME);
}
