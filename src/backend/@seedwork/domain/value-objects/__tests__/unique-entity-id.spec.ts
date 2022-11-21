import { InvalidUuidError } from '../../../errors/invalid-uuid.error';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { UniqueEntityId } from '../unique-entity-id';

describe('Unique Entity Id', () => {
  it('should return a valid auto generated id', () => {
    const uniqueEntityId = new UniqueEntityId();
    expect(uuidValidate(uniqueEntityId.value)).toBeTruthy();
  });

  describe('should return the given id', () => {
    const arrange = [
      { uuid: uuidv4() },
      { uuid: '22d195cb-f0e7-4214-85f8-0abf10dcd143' },
    ];

    test.each(arrange)('%j', ({ uuid }) => {
      const uniqueEntityId = new UniqueEntityId(uuid);
      expect(uuidValidate(uniqueEntityId.value)).toBeTruthy();
      expect(uniqueEntityId.value).toEqual(uuid);
    });
  });

  describe('should throw InvalidUuidError', () => {
    const arrange = [
      { uuid: '' },
      { uuid: 'qwerty' },
      { uuid: '1234567890' },
      { uuid: '22d195cb-1234-1234-1234-0abf10dcd143' },
    ];

    test.each(arrange)('%j', ({ uuid }) => {
      expect(() => new UniqueEntityId(uuid)).toThrow(new InvalidUuidError());
    });
  });
});
