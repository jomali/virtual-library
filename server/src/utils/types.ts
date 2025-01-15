type Camelize<T extends string> = T extends `${infer A}_${infer B}`
  ? `${A}${Camelize<Capitalize<B>>}`
  : T;

/**
 * Utility type to transform types with 'snake_case' keys to 'camelCase' keys.
 * For example, it transforms the type:
 *
 * ```
 *  type AnimalDB = {
 *    scientific_name: string;
 *    common_name: string;
 *  };
 * ```
 *
 * Into:
 *
 * ```
 *  type Animal = {
 *    scientificName: string;
 *    commonName: string;
 *  };
 */
export type CamelizeKeys<T extends object> = {
  [key in keyof T as key extends string
    ? Camelize<key>
    : key]: T[key] extends object ? CamelizeKeys<T[key]> : T[key];
};
