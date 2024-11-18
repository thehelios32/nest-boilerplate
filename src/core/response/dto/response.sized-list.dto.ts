import { ApiProperty } from '@nestjs/swagger';

export class ResponseSizedListDto<TData> {
  @ApiProperty({ default: true })
  success: boolean;

  @ApiProperty()
  total: number;

  @ApiProperty()
  data: TData;
}
