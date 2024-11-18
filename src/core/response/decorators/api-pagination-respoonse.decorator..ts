import { applyDecorators, Type } from '@nestjs/common';
import { ApiDefaultResponse, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseMetaDataDto } from '../dto/response.metaData.dto';
import { ResponsePaginatedDto } from '../dto/response.paginated.dto';


export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponsePaginatedDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
    ApiDefaultResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponseMetaDataDto) }],
      },
    })
  );
};
