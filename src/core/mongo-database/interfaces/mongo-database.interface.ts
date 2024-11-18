export interface IMongoDatabaseFindOneOptions {
    populate?: Record<string, boolean>;
}

export interface IMongoDeleteResult {
    acknowledged: boolean;
    deletedCount: number;
}
