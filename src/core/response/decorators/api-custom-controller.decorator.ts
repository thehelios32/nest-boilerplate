import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { ResponseDataDto } from '../dto/response.data.dto';
import { ResponseMetaDataDto } from '../dto/response.metaData.dto';
import { ResponsePaginatedDto } from '../dto/response.paginated.dto';
import { ErrorObjectDto, ResponseErrorDto, ResponseErrorDtoV2 } from '../dto/response.error.dto';
import {
  ErrorsObjectDto,
  ResponseUnprocessableEntityDto,
  UnproccessableEntityErrorObjectDto,
} from '../dto/response.unprocessable-entity.dto';
import { ResponseErrorForbiddenDto } from '../dto/response.error-forbidden.dto';
import { ResponseErrorUnauthorizedDto } from '../dto/response.error-unauthorized.dto';
import { DefaultListSerialization } from 'src/utils/helpers/serializations/default.list.serializations';
import { ResponseSizedListDto } from '../dto/response.sized-list.dto';
import { DefaultSearchPayloadDto } from 'src/utils/helpers/dto/default-search-payload.dto';
import { DefaultDeleteSerialization } from 'src/utils/helpers/serializations/default.delete.serialization';

export const ApiCustomController = () => {
  return applyDecorators(
    ApiExtraModels(
      ResponsePaginatedDto,
      ResponseMetaDataDto,
      ResponseDataDto,
      ResponseErrorDto,
      ResponseUnprocessableEntityDto,
      ErrorsObjectDto,
      ResponseErrorForbiddenDto,
      ResponseErrorUnauthorizedDto,
      UnproccessableEntityErrorObjectDto,
      ErrorObjectDto,
      DefaultListSerialization,
      ResponseSizedListDto,
      DefaultSearchPayloadDto,
      DefaultDeleteSerialization,

      ResponseErrorDtoV2
    ),
  );
};
