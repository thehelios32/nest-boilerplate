import { ApiProperty } from '@nestjs/swagger';

export class ErrorObjectDto {
  @ApiProperty()
  readonly code?: number;

  @ApiProperty()
  readonly message?: string;
}

export class ResponseErrorDto {
  @ApiProperty({ default: false })
  readonly success?: boolean;

  @ApiProperty({ type: ErrorObjectDto })
  readonly error: ErrorObjectDto;
}

export class ResponseErrorDtoV2 {
  @ApiProperty()
  readonly statusCode: number;

  @ApiProperty()
  readonly message: string;
}
