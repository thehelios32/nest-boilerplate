import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { HelperDateService } from 'src/utils/helper/services/helper.date.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class MinDateTodayEqualConstraint implements ValidatorConstraintInterface {
    constructor(private readonly helperDateService: HelperDateService) {}

    validate(value: string): boolean {
        const todayDate = this.helperDateService.startOfDay();
        const valueDate = this.helperDateService.create({ date: value });
        return valueDate >= todayDate;
    }
}

export function MinDateTodayEqual(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string): any {
        registerDecorator({
            name: 'MinDateTodayEqual',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: MinDateTodayEqualConstraint,
        });
    };
}
