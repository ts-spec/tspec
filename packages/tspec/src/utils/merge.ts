type Object = { [key: string]: any };

const isObject = (item: any) => (
  item && typeof item === 'object' && !Array.isArray(item)
);

export const mergeDeep = <T extends Object, S extends Object>(target: T, source: S): T & S => {
  let output = { ...target } as T & S;
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      const value = source[key];
      if (value === undefined) {
        return;
      }
      if (isObject(value)) {
        if (!(key in target)) {
          Object.assign(output, { [key]: value });
        } else {
          output[key as keyof S] = mergeDeep(target[key], value);
        }
      } else {
        Object.assign(output, { [key]: value });
      }
    });
  }
  return output;
}
