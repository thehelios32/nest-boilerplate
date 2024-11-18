import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { DeleteResult } from 'typeorm';

export class DefaultDeleteSerialization implements DeleteResult {
  @Exclude()
  raw: any;

  @ApiProperty({ required: false, name: 'count', title: 'Delete count' })
  @Expose({ name: 'count' })
  affected?: number;
}
