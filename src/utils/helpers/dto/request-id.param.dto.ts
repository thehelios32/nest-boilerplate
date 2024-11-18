import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RequestIdParamDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'string', title: 'ID' })
  id: string;
}
