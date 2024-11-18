import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { Leaves } from '../types/leaves.type';

export class SortDto<T extends object> {
    @ApiProperty()
    @IsBoolean()
    desc: boolean;

    @ApiProperty()
    @IsString()
    selector: Leaves<T>;
}
