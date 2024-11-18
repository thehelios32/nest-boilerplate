import { ApiProperty } from '@nestjs/swagger';
import { ENUM_AVAILABLE_OPERATORS } from '../available-operators.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ISearchFilter } from '../types/find-options.type';
import { ValueTypeByLeaf } from '../types/value-type-by-leaf.type';
import { Leaves } from '../types/leaves.type';

export class SearchFiltersDto<T extends object> implements ISearchFilter<T> {
    @ApiProperty()
    @IsString()
    field: Leaves<T>;

    @ApiProperty({ enum: ENUM_AVAILABLE_OPERATORS })
    @IsEnum(ENUM_AVAILABLE_OPERATORS)
    operator: ENUM_AVAILABLE_OPERATORS;

    @ApiProperty()
    @IsNotEmpty()
    value: ValueTypeByLeaf<T, Leaves<T>>;
}
