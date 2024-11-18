export enum ENUM_FILTER_TYPES {
  ILIKE = 'ilike',
  EQUAL = 'equal',
  DATE_RANGE = 'date_range',
  GT = 'greater_then',
  LT = 'less_then',
}

export type FilterType<Entity> = {
  [k in ENUM_FILTER_TYPES]?: (keyof Entity)[];
};
