import { applyDecorators } from '@nestjs/common';
import { ApiCustomForbiddenResponse } from './api-custom-forbidden-response.decorattor';
import { ApiCustomBadRequestResponse } from './api-custom-bad-request-response.decorator';
import { ApiCustomUnauthorizedResponse } from './api-custom-unauthorized-response.decorator';
import { ApiCustomUnprocessableEntityResponse } from './api-cutom-unprocessable-entity-response.dto';

export const ApiCustomErrorResponses = () => {
  return applyDecorators(
    ApiCustomUnprocessableEntityResponse(),
    ApiCustomForbiddenResponse(),
    ApiCustomBadRequestResponse(),
    ApiCustomUnauthorizedResponse(),
  );
};
