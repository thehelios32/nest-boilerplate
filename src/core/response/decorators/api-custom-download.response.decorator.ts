import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiUnprocessableEntityResponse, getSchemaPath, ApiNotFoundResponse, ApiProduces } from '@nestjs/swagger';
import { ResponseMetaDataDto } from '../dto/response.metaData.dto';

export function ApiCustomDowload(): any {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        type: 'file',
      },
      content: { 'application/octet-stream': {} },
    }),
    ApiUnprocessableEntityResponse({
      content: { 'application/json': {} },
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponseMetaDataDto) }],
      },
    }),
    ApiNotFoundResponse({
      content: { 'application/json': {} },
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponseMetaDataDto) }],
      },
    }),
    ApiProduces('application/octet-stream', 'application/json'),
  );
}
