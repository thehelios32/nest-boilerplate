import moment from 'moment';
import { ValueTransformer } from 'typeorm';

export const DateTransformer: ValueTransformer = {
  to: (value) => moment(value, 'DD.MM.YYYY').format('YYYY-MM-DD'),
  from: (dbValue) => moment(dbValue, 'YYYY-MM-DD').format('DD.MM.YYYY'),
};

export const DateTransformerTimestamps: ValueTransformer = {
  to: (value) => moment(value).format('DD.MM.YYYY HH:mm:ss'),
  from: (dbValue) => moment(dbValue).format('DD.MM.YYYY HH:mm:ss'),
};
