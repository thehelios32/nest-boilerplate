export type Leaves<T> = T extends Date
    ? never
    : T extends object
      ? {
            [K in keyof T]: `${Exclude<K, symbol>}${T[K] extends (infer U)[] ? (Leaves<U> extends never ? '' : `.${Leaves<U>}`) : Leaves<T[K]> extends never ? '' : `.${Leaves<T[K]>}`}`;
        }[keyof T]
      : never;
