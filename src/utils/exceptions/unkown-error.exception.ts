import { BadRequestException } from '@nestjs/common';

export class UnkownErrorException extends BadRequestException {
  constructor(err?: any) {
    super({
      code: 999,
      message: 'Unknown error',
      cause: err,
    });
  }
}
