export interface IBaseEntityWithTimestamp {
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export class BaseEntityWithTimestamp implements IBaseEntityWithTimestamp {
    createdAt?: Date;
    updatedAt?: Date;
}
