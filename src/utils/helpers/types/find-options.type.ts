import { ENUM_AVAILABLE_OPERATORS } from '../available-operators.enum';
import { Leaves } from './leaves.type';
import { ValueTypeByLeaf } from './value-type-by-leaf.type';

export interface ISearchFilter<T extends object> {
    field: Leaves<T>;
    operator: ENUM_AVAILABLE_OPERATORS;
    value: ValueTypeByLeaf<T, Leaves<T>>;
}

export interface ISort<T extends object> {
    desc: boolean;
    selector: Leaves<T>;
}

export interface IFindOptions<T extends object> {
    filters?: ISearchFilter<T>[];
    sort?: ISort<T>;
    page?: number;
    size?: number;
    search?: string;
    searchBy?: string[];
}
