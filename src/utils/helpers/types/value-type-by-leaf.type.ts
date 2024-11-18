import { Leaves } from './leaves.type';

export type ValueTypeByLeaf<T, Leaf extends Leaves<T>> = Leaf extends `${infer Key}.${string}`
    ? Key extends keyof T
        ? ValueTypeByLeaf<T[Key], Leaves<T[Key]>>
        : never
    : Leaf extends keyof T
      ? T[Leaf]
      : never;
