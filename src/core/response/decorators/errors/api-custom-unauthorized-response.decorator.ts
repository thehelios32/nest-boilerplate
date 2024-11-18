import { applyDecorators } from '@nestjs/common';
import { ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseErrorUnauthorizedDto } from '../../dto/response.error-unauthorized.dto';

export const ApiCustomUnauthorizedResponse = () => {
  return applyDecorators(
    ApiUnauthorizedResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponseErrorUnauthorizedDto) }],
      },
    }),
  );
};
