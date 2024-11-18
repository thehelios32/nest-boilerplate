import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDataDto } from '../dto/response.data.dto';
import { ResponseMetaDataDto } from '../dto/response.metaData.dto';
import { ResponseSizedListDto } from '../dto/response.sized-list.dto';
import { ApiCustomErrorResponses } from './errors/api-custom-error-responses.decorator';

export const ApiCustomResponseWithMeta = <TModel extends Type<any>>(model?: TModel) => {
  return applyDecorators(
    ApiOkResponse({
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
    ApiCustomErrorResponses(),
  );
};

export const ApiCustomListResponseWithSize = <TModel extends Type<any>>(model?: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseSizedListDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: {
                  allOf: [
                    {
                      $ref: getSchemaPath(model),
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    }),
    ApiCustomErrorResponses(),
  );
};
