import { applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseErrorForbiddenDto } from '../../dto/response.error-forbidden.dto';

export const ApiCustomForbiddenResponse = () => {
  return applyDecorators(
    ApiForbiddenResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponseErrorForbiddenDto) }],
      },
    }),
  );
};
