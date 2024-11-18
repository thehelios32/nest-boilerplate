import { ApiProperty } from '@nestjs/swagger';

export class ResponseDataDto<TData> {
  @ApiProperty()
  data: TData;
}
