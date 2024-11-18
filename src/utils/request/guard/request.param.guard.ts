import { Injectable, CanActivate, ExecutionContext, Type, mixin, BadRequestException } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ENUM_RESPONSE_STATUS_CODE_ERROR } from 'src/core/response/response.constant';

export function RequestParamRawGuard(classValidation: ClassConstructor<any>[]): Type<CanActivate> {
    @Injectable()
    class MixinRequestParamRawGuard implements CanActivate {
        async canActivate(context: ExecutionContext): Promise<boolean> {
            const { params } = context.switchToHttp().getRequest();
            for (const cv of classValidation) {
                const request = plainToInstance(cv, params);

                const errors: ValidationError[] = await validate(request);

                if (errors.length > 0) {
                    throw new BadRequestException({
                        code: ENUM_RESPONSE_STATUS_CODE_ERROR.REQUEST_MISSING_REQUIRED_PARAM,
                        message: ENUM_RESPONSE_STATUS_CODE_ERROR.REQUEST_MISSING_REQUIRED_PARAM,
                        errors: errors,
                    });
                }
            }

            return true;
        }
    }

    return mixin(MixinRequestParamRawGuard);
}
