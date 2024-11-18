import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  per_page: number;

  @ApiProperty()
  total: number;
}

export class ResponsePaginatedDto<TData> {
  @ApiProperty({ default: true })
  success?: boolean;

  @ApiProperty({ type: () => PaginationMetaDto })
  meta: PaginationMetaDto;

  @ApiProperty()
  data: TData[];
}
