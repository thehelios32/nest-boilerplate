import { ApiProperty } from '@nestjs/swagger';
import { ErrorObjectDto } from './response.error.dto';

export class ForbiddenErrorObjectDto extends ErrorObjectDto {}

export class ResponseErrorForbiddenDto {
  @ApiProperty({ default: false })
  readonly success?: boolean;

  @ApiProperty({ type: ErrorObjectDto })
  readonly error: ErrorObjectDto;
}
