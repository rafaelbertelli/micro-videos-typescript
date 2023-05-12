import { Entity } from '../../../@seedwork/domain/entity/entity';
import { InMemorySearchableRepository } from '../in-memory.repository';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}
class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name'];

  protected applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): StubEntity[] {
    if (!filter) {
      return items;
    }

    const filterByArg = (arg: string) =>
      arg.toLowerCase() === filter.toLowerCase();

    return items.filter(
      ({ props }) => filterByArg(props.name) || filterByArg(`${props.price}`),
    );
  }
}

describe('In memory searchable repository', () => {
  let repository: StubInMemorySearchableRepository;

  beforeEach(() => {
    repository = new StubInMemorySearchableRepository();
  });

  describe('applyFilter', () => {
    it('filters the input list correctly based on the provided filter string', () => {
      // Arrange
      const items = [
        new StubEntity({ name: 'banana', price: 1.5 }),
        new StubEntity({ name: 'apple', price: 2.5 }),
        new StubEntity({ name: 'orange', price: 3.0 }),
      ];

      // Act
      let filteredItems = repository['applyFilter'](items, 'APPLE');

      // Assert
      expect(filteredItems.length).toBe(1);
      expect(filteredItems[0].props.name).toBe('apple');

      // TEST 2
      // Act
      filteredItems = repository['applyFilter'](items, '');

      // Assert
      expect(filteredItems.length).toBe(3);
      expect(filteredItems).toStrictEqual(items);

      // TEST 3
      // Act
      const filterMethodSpyOn = jest.spyOn(items, 'filter');
      filteredItems = repository['applyFilter'](items, null);

      // Assert
      expect(filteredItems.length).toBe(3);
      expect(filteredItems).toStrictEqual(items);
      expect(filterMethodSpyOn).not.toHaveBeenCalled();

      // TEST 4
      // Act
      filteredItems = repository['applyFilter'](items, '3');

      // Assert
      expect(filteredItems.length).toBe(1);
      expect(filteredItems).toStrictEqual([items[2]]);

      // TEST 5
      // Act
      filteredItems = repository['applyFilter'](items, '30');

      // Assert
      expect(filteredItems.length).toBe(0);
      expect(filteredItems).toStrictEqual([]);
    });
  });

  describe('applySort', () => {
    it('should not sort items', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 1.5 }),
        new StubEntity({ name: 'a', price: 2.5 }),
        new StubEntity({ name: 'o', price: 3.0 }),
      ];

      const itemsSorted = repository['applySort'](items, null, null);
      expect(itemsSorted).toStrictEqual(items);
    });

    it('should not sort by price given price is not registered at sortableFields', () => {
      const items = [
        new StubEntity({ name: 'a', price: 2.5 }),
        new StubEntity({ name: 'b', price: 1.5 }),
        new StubEntity({ name: 'o', price: 3.0 }),
      ];

      const itemsSorted = repository['applySort'](items, 'price', 'asc');
      expect(itemsSorted).toStrictEqual(items);
    });

    it('should sort items asc', () => {
      const items = [
        new StubEntity({ name: 'b', price: 1.5 }),
        new StubEntity({ name: 'a', price: 2.5 }),
        new StubEntity({ name: 'o', price: 3.0 }),
      ];

      const itemsSorted = repository['applySort'](items, 'name', 'asc');
      expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);
    });

    it('should sort items desc', () => {
      const items = [
        new StubEntity({ name: 'b', price: 1.5 }),
        new StubEntity({ name: 'a', price: 2.5 }),
        new StubEntity({ name: 'o', price: 3.0 }),
      ];

      const itemsSorted = repository['applySort'](items, 'name', 'desc');
      expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);
    });
  });
});
