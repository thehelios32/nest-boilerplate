import { ApiProperty } from '@nestjs/swagger';
import { IResponseMetadata } from '../response.interface';

export class ResponseMetaDataDto implements IResponseMetadata {
  @ApiProperty({ default: true })
  readonly success?: boolean;

  // @ApiProperty()
  // readonly code?: number;

  // @ApiProperty()
  // readonly message?: string;

  @ApiProperty()
  readonly data?: any;
}
