import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseErrorDto } from '../../dto/response.error.dto';

export const ApiCustomBadRequestResponse = () => {
  return applyDecorators(
    ApiBadRequestResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponseErrorDto) }],
      },
    }),
  );
};
