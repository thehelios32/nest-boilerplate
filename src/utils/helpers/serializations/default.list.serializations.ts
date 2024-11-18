import { ApiProperty } from '@nestjs/swagger';

export class DefaultListSerialization<T> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  data: T;
}
