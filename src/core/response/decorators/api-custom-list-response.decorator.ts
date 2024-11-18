import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiCustomErrorResponses } from './errors/api-custom-error-responses.decorator';

export const ApiCustomListResponse = <TModel extends Type<any>>(model?: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            type: 'array',
            items: {
              allOf: [
                {
                  $ref: getSchemaPath(model),
                },
              ],
            },
          },
        ],
      },
    }),

    ApiCustomErrorResponses(),
  );
};
