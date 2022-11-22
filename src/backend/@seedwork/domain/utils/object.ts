export function deepFreeze<T>(obj: T) {
  if (obj === null) return null;
  if (obj === undefined) return undefined;

  const propsName = Object.getOwnPropertyNames(obj);

  for (const propName of propsName) {
    const prop = obj[propName] as keyof T;

    if (prop && typeof prop === 'object') {
      deepFreeze(prop);
    }
  }

  return Object.freeze(obj);
}
