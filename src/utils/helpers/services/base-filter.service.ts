import { Equal, Like, ILike, MoreThan, LessThan, FindOptionsWhere, SelectQueryBuilder } from 'typeorm';
import { ENUM_AVAILABLE_OPERATORS } from '../available-operators.enum';
import { SearchFiltersDto } from '../dto/search-filter.dto';
import { FilterType } from '../types/filter.type';

export class BaseFilterService {
    getOperator(operator: ENUM_AVAILABLE_OPERATORS, value: any) {
        switch (operator) {
            case ENUM_AVAILABLE_OPERATORS.EQUAL:
                return Equal(value);

            case ENUM_AVAILABLE_OPERATORS.LIKE:
                return Like(`%${value}%`);

            case ENUM_AVAILABLE_OPERATORS.ILIKE:
                return ILike(`%${value}%`);

            case ENUM_AVAILABLE_OPERATORS.GT:
                return MoreThan(value);

            case ENUM_AVAILABLE_OPERATORS.LT:
                return LessThan(value);
            default:
                return Like(`%${value}%`);
        }
    }

    buildFilter<T extends object>(filters: SearchFiltersDto<T>[]): FindOptionsWhere<T> {
        const results: FindOptionsWhere<T> = filters?.length === 0 ? undefined : {};
        for (const filter of filters) {
            results[filter.field as any] = this.getOperator(filter.operator, filter.value);
        }
        return results;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    buildQueryBuilderFilters<Entity>(queryBuilder: SelectQueryBuilder<Entity>, filters: any, filterTypes: FilterType<Entity>): void {
        for (const filter of filters) {
            queryBuilder.where({ [filter.field]: this.getOperator(filter.operator, filter.value) });
        }
    }

    buildQueryBuilderSearch<Entity>(queryBuilder: SelectQueryBuilder<Entity>, searchString: string, searchBy: string[]) {
        for (const field of searchBy) {
            queryBuilder.orWhere({ [field]: this.getOperator(ENUM_AVAILABLE_OPERATORS.ILIKE, searchString) });
        }
    }
}
