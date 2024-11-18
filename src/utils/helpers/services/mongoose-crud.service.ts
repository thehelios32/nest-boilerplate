import { Document, FilterQuery, InferId, Model, QuerySelector, UpdateQuery } from 'mongoose';
import { IFindOptions } from '../types/find-options.type';
import { ENUM_AVAILABLE_OPERATORS } from '../available-operators.enum';

export type EntityDto<T> = T extends Document<unknown, unknown, infer U> ? U : T;

const getFilterOperator = (operator: ENUM_AVAILABLE_OPERATORS, value: string): QuerySelector<any> => {
    switch (operator) {
        case ENUM_AVAILABLE_OPERATORS.EQUAL:
            return { $eq: value };
        case ENUM_AVAILABLE_OPERATORS.GT:
            return { $gt: value };
        case ENUM_AVAILABLE_OPERATORS.LT:
            return { $lt: value };
        case ENUM_AVAILABLE_OPERATORS.ILIKE:
            return { $regex: `.*${escapeRegExp(value)}.*`, $options: 'i' };
        case ENUM_AVAILABLE_OPERATORS.LIKE:
            return { $regex: `.*${escapeRegExp(value)}.*` };
    }
};
const escapeRegExp = (text: string): string => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

export class MongooseCrudService<T extends Document> {
    constructor(protected readonly model: Model<T>) {}

    async create(data: EntityDto<T>): Promise<T> {
        return this.model.create(data);
    }

    async findOneBy(query: FilterQuery<T>): Promise<T> {
        return this.model.findOne(query).exec();
    }

    async findOneById(id: string): Promise<T> {
        return this.model.findById(id).exec();
    }

    async findPaginated(filterOptions: IFindOptions<EntityDto<T>>): Promise<T[]> {
        const pipe = this.model.find();
        if (filterOptions.sort) pipe.sort({ [filterOptions.sort.selector]: filterOptions.sort.desc ? 'desc' : 'asc' });
        if (filterOptions.filters?.length > 0) {
            const t = filterOptions.filters.map((item) => ({ [item.field]: getFilterOperator(item.operator, item.value) }));
            pipe.and(t as any);
        }
        if (filterOptions.size) pipe.limit(filterOptions.size);
        if (filterOptions.page) pipe.skip((filterOptions.size ?? 0) * (filterOptions.page - 1));
        return pipe.exec();
    }

    async updateOneById(query: FilterQuery<T>, data: UpdateQuery<T>): Promise<T> {
        return this.model.findOneAndUpdate(query, data, { new: true }).exec();
    }

    async deleteOne(query: FilterQuery<T>): Promise<T> {
        return this.model.findOneAndDelete(query).exec();
    }

    async exists(query: FilterQuery<T>): Promise<{ _id: InferId<T> }> {
        return this.model.exists(query).exec();
    }
}
