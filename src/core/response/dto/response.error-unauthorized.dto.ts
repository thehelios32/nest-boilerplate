import { ApiProperty } from '@nestjs/swagger';
import { ErrorObjectDto } from './response.error.dto';

export class ResponseErrorUnauthorizedDto {
  @ApiProperty({ default: false })
  readonly success?: boolean;

  @ApiProperty({ type: ErrorObjectDto })
  readonly error: ErrorObjectDto;
}
