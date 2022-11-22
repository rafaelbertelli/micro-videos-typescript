import { ValueObject } from '../value-object';

class StubClass extends ValueObject {}

describe('Value Object', () => {
  it('should be able to get passed value', () => {
    let instance = new StubClass('Rafael');
    expect(instance.value).toEqual('Rafael');

    instance = new StubClass({ name: 'Rafael' });
    expect(instance.value).toEqual({ name: 'Rafael' });
  });

  it('should get toString', () => {
    let instance = new StubClass('Rafael');
    expect(instance.toString()).toEqual('Rafael');

    instance = new StubClass('');
    expect(instance.toString()).toEqual('');

    instance = new StubClass(null);
    expect(instance.toString()).toEqual('null');

    instance = new StubClass(9);
    expect(instance.toString()).toEqual('9');

    instance = new StubClass({ name: 'Rafael' });
    expect(instance.value).toStrictEqual({ name: 'Rafael' });

    instance = new StubClass([1, 2, 3]);
    expect(instance.value).toStrictEqual([1, 2, 3]);
    console.log(instance.toString());
  });

  it('should be immutable', () => {
    const object = {
      name: 'Rafael',
      prop: 123,
      sub: { sub2: 111 },
    };
    const instance = new StubClass(object);

    expect(() => (instance.value.sub.sub2 = 33)).toThrow();
    expect(instance.value).toStrictEqual(object);
  });
});
