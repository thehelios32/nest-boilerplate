import { ValidationError } from 'class-validator';

export interface IValidationErrorImport {
  row: number;
  file?: string;
  errors: ValidationError[];
}

export interface IErrorException {
  code: number;
  statusCode: number;
  message: string;
  cause?: string;
  errors?: ValidationError[] | IValidationErrorImport[];
  errorFromImport?: boolean;
  data?: Record<string, any>;
  properties?: any;
}
