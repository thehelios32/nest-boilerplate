import { HttpStatus, Module, UnprocessableEntityException, ValidationError, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { RequestControllerGuard } from './guard/request.controller.guard';
import { RequestAuthInterceptor } from './interceptor/request.auth.interceptor';
import { RequestTimestampInterceptor } from './interceptor/request.timestamp.interceptor';
import { ENUM_REQUEST_STATUS_CODE_ERROR } from '../../utils/constants/request.constant';
import { IsStartWithConstraint } from './validation/request.is-start-with.validation';
import { MaxGreaterThanEqualConstraint } from './validation/request.max-greater-than-equal.validation';
import { MaxGreaterThanConstraint } from './validation/request.max-greater-than.validation';
import { MinDateTodayEqualConstraint } from './validation/request.min-date-equal.validation';
import { MinGreaterThanEqualConstraint } from './validation/request.min-greater-than-equal.validation';
import { MinGreaterThanConstraint } from './validation/request.min-greater-than.validation';
import { IsOnlyDigitsConstraint } from './validation/request.only-digits.validation';
import { SafeStringConstraint } from './validation/request.safe-string.validation';
import { SkipConstraint } from './validation/request.skip.validation';
import { StringOrNumberOrBooleanConstraint } from './validation/request.string-or-number-or-boolean.validation';

@Module({
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useFactory: () =>
                new ValidationPipe({
                    transform: true,
                    skipNullProperties: false,
                    skipUndefinedProperties: false,
                    skipMissingProperties: false,
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                    exceptionFactory: async (errors: ValidationError[]) =>
                        new UnprocessableEntityException({
                            statusCode: ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR,
                            message: 'http.clientError.unprocessableEntity',
                            errors,
                        }),
                }),
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: RequestTimestampInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: RequestAuthInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: RequestControllerGuard,
        },
        IsStartWithConstraint,
        MaxGreaterThanEqualConstraint,
        MaxGreaterThanConstraint,
        MinGreaterThanEqualConstraint,
        MinGreaterThanConstraint,
        SkipConstraint,
        StringOrNumberOrBooleanConstraint,
        SafeStringConstraint,
        IsOnlyDigitsConstraint,
        MinDateTodayEqualConstraint,
    ],
    imports: [],
})
export class RequestModule {}
