import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsNumber } from 'class-validator';
import { SearchFiltersDto } from './search-filter.dto';
import { IFindOptions } from '../types/find-options.type';

export class DefaultSearchPayloadDto<T extends object> implements IFindOptions<T> {
    @ApiProperty({ isArray: true, type: SearchFiltersDto })
    @ValidateNested({ each: true })
    @Type(() => SearchFiltersDto)
    filters?: SearchFiltersDto<T>[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    page?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    size?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    sort?: any;
}
