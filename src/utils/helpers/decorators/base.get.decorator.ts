import { applyDecorators, CanActivate, UseGuards } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { RequestParamRawGuard } from 'src/utils/request/guard/request.param.guard';
import { RequestIdParamDto } from '../dto/request-id.param.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function BaseGetByIdDecorator(...guards: (CanActivate | Function)[]): any {
    return applyDecorators(ApiParam({ name: 'id', type: 'number' }), UseGuards(RequestParamRawGuard([RequestIdParamDto]), ...guards));
}

export function BaseGetByIdDecoratorExtended(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    guards: (CanActivate | Function)[],
    decorators: (ClassDecorator | MethodDecorator | PropertyDecorator)[],
): any {
    return applyDecorators(
        ApiParam({ name: 'id', type: 'number' }),
        UseGuards(RequestParamRawGuard([RequestIdParamDto]), ...guards),
        ...decorators,
    );
}
