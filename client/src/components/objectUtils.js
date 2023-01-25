/**
 * For a given object `obj`, returns a copy removing all its attributes which:
 *
 * - are null
 * - are undefined
 * - are an empty string
 * - are an empty array
 * - are an empty object
 *
 * @param {*} obj
 * @returns a new object based on `obj`
 */
export const clearObject = (obj) => {
  const result = { ...obj };

  Object.keys(result).forEach((element) => {
    if (
      // search for empty strings, nulls and undefineds
      result[element] === null ||
      result[element] === undefined ||
      result[element] === '' ||
      // search for empty arrays
      (Array.isArray(result[element]) && !result[element].length) ||
      // search for empty objects
      (Object.is(result[element]) && !Object.keys(result[element]).length)
    ) {
      delete result[element];
    }
  });

  return result;
};

/**
 * For a given object `obj`, returns a copy with all values trim
 * @param {*} obj
 * @returns a new object based on `obj`
 */
export const trimValuesObject = (object) => {
  const newObject = {};
  Object.keys(object).forEach((key) => {
    newObject[key] =
      typeof object[key] === 'string'
        ? object[key].trim()
        : typeof object[key] === 'object' && object[key] !== null
        ? trimValuesObject(object[key])
        : object[key];
  });
  return newObject;
};
