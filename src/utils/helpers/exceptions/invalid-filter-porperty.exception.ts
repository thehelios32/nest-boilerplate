import { UnprocessableEntityException } from '@nestjs/common';

export class InvalidFilterPropertyException extends UnprocessableEntityException {}
