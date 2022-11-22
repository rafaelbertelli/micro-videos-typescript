import { deepFreeze } from '../object';

describe('Object', () => {
  it('should be immutable', () => {
    let props: any;
    props = { a: 1, b: 2, c: { ca: 3, cb: 4 } };
    const freezeObject = deepFreeze(props);

    expect(freezeObject).toStrictEqual(props);
    expect(() => (props.a = 123)).toThrow();
    expect(() => (props.c.cb = 450)).toThrow();

    props = [1, 2, 3];
    const freezeList = deepFreeze(props);
    expect(freezeList).toStrictEqual(props);
  });

  it('should by pass null and undefined', () => {
    expect(deepFreeze(null)).toBeNull();
    expect(deepFreeze(undefined)).toBeUndefined();
  });
});
