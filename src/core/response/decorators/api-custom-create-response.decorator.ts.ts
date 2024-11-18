import { applyDecorators, Type } from '@nestjs/common';
import { ApiCreatedResponse, ApiDefaultResponse, ApiForbiddenResponse, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDataDto } from '../dto/response.data.dto';
import { ResponseMetaDataDto } from '../dto/response.metaData.dto';
import { ResponseErrorForbiddenDto } from '../dto/response.error-forbidden.dto';
import { ResponseErrorUnauthorizedDto } from '../dto/response.error-unauthorized.dto';

export const ApiCustomCreateResponse = <TModel extends Type<any>>(model?: TModel) => {
  return applyDecorators(
    ApiCreatedResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseMetaDataDto) },
          { $ref: getSchemaPath(ResponseDataDto) },
          {
            properties: {
              data: model ? { $ref: getSchemaPath(model) } : { type: 'object' },
            },
          },
        ],
      },
    }),
    ApiDefaultResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponseMetaDataDto) }],
      },
    }),
    ApiForbiddenResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponseErrorForbiddenDto) }],
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponseErrorUnauthorizedDto) }],
      },
    }),
  );
};
