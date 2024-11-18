import { applyDecorators } from '@nestjs/common';
import { ApiUnprocessableEntityResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseUnprocessableEntityDto } from '../../dto/response.unprocessable-entity.dto';

export const ApiCustomUnprocessableEntityResponse = () => {
  return applyDecorators(
    ApiUnprocessableEntityResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponseUnprocessableEntityDto) }],
      },
    }),
  );
};
