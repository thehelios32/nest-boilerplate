import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class ErrorsObjectDto {
  @ApiProperty()
  field: string;
  @ApiProperty()
  message: string;
}

export class UnproccessableEntityErrorObjectDto {
  @ApiProperty()
  readonly code?: number;

  @ApiProperty()
  readonly message?: string;

  @ApiProperty({ type: () => ErrorsObjectDto, isArray: true })
  @Type(() => ErrorsObjectDto)
  readonly errors?: ErrorsObjectDto;
}

export class ResponseUnprocessableEntityDto {
  @ApiProperty({ default: false })
  readonly success?: boolean;

  @ApiProperty({ type: UnproccessableEntityErrorObjectDto })
  readonly error: UnproccessableEntityErrorObjectDto;
}
