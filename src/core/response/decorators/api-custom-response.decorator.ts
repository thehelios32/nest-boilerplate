import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiCustomErrorResponses } from './errors/api-custom-error-responses.decorator';
import { ENUM_STATUS_MESSAGES } from 'src/utils/constants/error.constant';
import { ENUM_RESPONSE_STATUS_CODE_ERROR, ENUM_RESPONSE_STATUS_MESSAGE_ERROR } from '../response.constant';
import { HttpStatusCode } from 'axios';
import { ResponseErrorDtoV2 } from '../dto/response.error.dto';

export const ApiCustomResponse = <TModel extends Type<any>>(model?: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(model) }],
      },
    }),

    ApiCustomErrorResponses(),
  );
};

export const ApiCustomResponseV2 = <TModel extends Type<any>>(model?: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(model) }],
      },
    }),
    ApiUnauthorizedResponse({ description: ENUM_STATUS_MESSAGES.STATUS_401 }),
    ApiInternalServerErrorResponse({ description: ENUM_STATUS_MESSAGES.STATUS_500 }),
    ApiBadRequestResponse({
      content: {
        'application/json': {
          schema: { $ref: getSchemaPath(ResponseErrorDtoV2) },
          examples: {
            ValidationError: {
              description: 'Тело запроса заполнено некорректно',
              value: {
                statusCode: ENUM_RESPONSE_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR,
                message: ENUM_RESPONSE_STATUS_MESSAGE_ERROR.REQUEST_VALIDATION_ERROR,
              },
            },
            Error: {
              description: 'Другие ошибки от сервиса LSBO',
              value: {
                statusCode: HttpStatusCode.BadRequest,
                message: ENUM_RESPONSE_STATUS_MESSAGE_ERROR.UNKOWN_ERROR,
              },
            },
          },
        },
      },
    }),

    // ApiCustomErrorResponses(),
  );
};
