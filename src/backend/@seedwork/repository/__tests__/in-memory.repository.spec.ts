import { Entity } from '../../../@seedwork/domain/entity/entity';
import { NotFoundError } from '../../../@seedwork/errors/not-found.error';
import { InMemoryRepository } from '../in-memory.repository';

type StubEntityProps = { name: string; price: number };
class StubEntity extends Entity<StubEntityProps> {}
class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('In Memory Repository', () => {
  let repository: StubInMemoryRepository;

  const entity_1 = new StubEntity({ name: 'Xiblau', price: 7.99 });
  const entity_2 = new StubEntity({ name: 'Varum', price: 1.99 });

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  describe('insert', () => {
    it('should insert', () => {
      const entity = new StubEntity({ name: 'Xiblau', price: 7.99 });
      repository.insert(entity);
      expect(repository.items[0]).toStrictEqual(entity);
    });
  });

  describe('findById', () => {
    it('should find by id', async () => {
      repository.items = [entity_1, entity_2];
      const result = await repository.findById(entity_2.id);
      expect(result).toStrictEqual(entity_2);
    });

    it('should throw error when entity is not found', async () => {
      expect(
        async () => await repository.findById(entity_2.id),
      ).rejects.toThrow(
        new NotFoundError(`Entity ID: ${entity_2.id} not found`),
      );
    });
  });

  describe('findAll', () => {
    it('should find all', async () => {
      repository.items = [entity_1, entity_2];
      const result = await repository.findAll();
      expect(result).toStrictEqual([entity_1, entity_2]);
    });
  });

  // describe('update', () => {
  //   it('should update', async () => {
  //     repository.items = [entity_1, entity_2];

  //     const updated_entity_2 = entity_2
  //     const result = await repository.update()
  //     expect(result).toStrictEqual([entity_1, entity_2]);
  //   });
  // });
});
