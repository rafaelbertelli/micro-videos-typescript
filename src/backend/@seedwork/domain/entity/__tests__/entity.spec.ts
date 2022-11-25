import { InvalidUuidError } from '../../../../@seedwork/errors/invalid-uuid.error';
import { UniqueEntityId } from '../../value-objects/unique-entity-id';
import { Entity } from '../entity';

type StubEntityProps = {
  id: string;
  name: string;
  age: number;
};

class StubEntity extends Entity<StubEntityProps> {
  constructor(protected readonly props: StubEntityProps) {
    super(props, props.id);
  }
}

describe('Entity', () => {
  it('should be instantiated with a valid id', () => {
    const props = {
      id: new UniqueEntityId().value,
      name: 'Grigoleto',
      age: 33,
    };
    const instance = new StubEntity(props);

    expect(instance.id).toEqual(props.id);
    expect(instance.toJson()).toStrictEqual(props);
  });

  it('should be instantiated with another valid id', () => {
    const props = {
      id: 'd1942dfc-ecbe-41e3-9359-b6abef4a2d0d',
      name: 'Grigoleto',
      age: 33,
    };
    const instance = new StubEntity(props);

    expect(instance.id).toEqual(props.id);
    expect(instance.toJson()).toStrictEqual(props);
  });

  it('should not be instantiated with an invalid id', () => {
    const props = {
      id: 'd1942dfc-xxxx-xxxx-xxxx-b6abef4a2d0d',
      name: 'Grigoleto',
      age: 33,
    };

    expect(() => new StubEntity(props)).toThrow(InvalidUuidError);
  });
});
