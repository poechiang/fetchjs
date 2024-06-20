export type LooseObject<T = any> = {
  [x: string | number]: T | Loose<T>;
};

export type LooseArray<T = any> = Array<T>;

export type Loose<T = any> = LooseObject<T> | LooseArray<T>;
