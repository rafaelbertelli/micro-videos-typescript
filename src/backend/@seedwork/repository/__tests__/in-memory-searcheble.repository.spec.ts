import { Entity } from '../../../@seedwork/domain/entity/entity';
import { InMemorySearchableRepository } from '../in-memory.repository';
import { SearchParams, SearchResult } from '../repository-contracts';

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

  describe('applyPaginate', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    it('should return the first page of items when page is 1 and per_page is 5', () => {
      const page = 1;
      const per_page = 5;
      const result = repository['applyPaginate'](items as any, page, per_page);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return the second page of items when page is 2 and per_page is 5', () => {
      const page = 2;
      const per_page = 5;
      const result = repository['applyPaginate'](items as any, page, per_page);
      expect(result).toEqual([6, 7, 8, 9, 10]);
    });

    it('should return an empty array when the items array is empty', () => {
      const page = 1;
      const per_page = 5;
      const result = repository['applyPaginate']([], page, per_page);
      expect(result).toEqual([]);
    });

    it('should return all items when per_page is larger than the length of the items array', () => {
      const page = 1;
      const per_page = 20;
      const result = repository['applyPaginate'](items as any, page, per_page);
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });

  describe('search https://plataforma.fullcycle.com.br/courses/184/168/143/conteudos?capitulo=143&conteudo=8131', () => {
    it('should apply only paginate when other params are null', async () => {
      const entity = new StubEntity({ name: 'a', price: 3.0 });
      repository.items = Array(16).fill(entity);

      const result = await repository.search(new SearchParams({}));
      expect(result).toEqual(
        new SearchResult({
          items: Array(15).fill(entity),
          total: 16,
          current_page: 1,
          per_page: 15,
          sort: null,
          sort_dir: 'desc',
          filter: null,
        }),
      );
    });

    it('should apply paginate and filter', async () => {
      const items = [
        new StubEntity({ name: 'teste', price: 3.0 }),
        new StubEntity({ name: 'a', price: 3.0 }),
        new StubEntity({ name: 'TESTE', price: 3.0 }),
        new StubEntity({ name: 'TeSte', price: 3.0 }),
      ];
      repository.items = items;

      let result = await repository.search(
        new SearchParams({
          page: 1,
          per_page: 2,
          filter: 'TESTE',
        }),
      );

      expect(result).toEqual(
        new SearchResult({
          items: [items[0], items[2]],
          total: 3,
          current_page: 1,
          per_page: 2,
          sort: null,
          sort_dir: 'desc',
          filter: 'TESTE',
        }),
      );

      result = await repository.search(
        new SearchParams({
          page: 1,
          per_page: 2,
          filter: 'a',
        }),
      );

      expect(result).toEqual(
        new SearchResult({
          items: [items[1]],
          total: 1,
          current_page: 1,
          per_page: 2,
          sort: null,
          sort_dir: 'desc',
          filter: 'a',
        }),
      );
    });

    it('should apply paginate and sort', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 3.0 }),
        new StubEntity({ name: 'a', price: 3.0 }),
        new StubEntity({ name: 'd', price: 3.0 }),
        new StubEntity({ name: 'c', price: 3.0 }),
      ];
      repository.items = items;

      let result = await repository.search(
        new SearchParams({
          page: 1,
          per_page: 2,
          sort: 'name',
          sort_dir: 'asc',
        }),
      );

      expect(result).toEqual(
        new SearchResult({
          items: [items[1], items[0]],
          total: 4,
          current_page: 1,
          per_page: 2,
          sort: 'name',
          sort_dir: 'asc',
          filter: null,
        }),
      );

      result = await repository.search(
        new SearchParams({
          page: 1,
          per_page: 2,
          filter: '',
          sort: 'name',
          sort_dir: 'desc',
        }),
      );

      expect(result).toEqual(
        new SearchResult({
          items: [items[2], items[3]],
          total: 4,
          current_page: 1,
          per_page: 2,
          sort: 'name',
          sort_dir: 'desc',
          filter: null,
        }),
      );
    });

    it('should apply paginate, sort and filter', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 3.0 }),
        new StubEntity({ name: 'a', price: 3.0 }),
        new StubEntity({ name: 'd', price: 3.0 }),
        new StubEntity({ name: 'c', price: 3.0 }),
      ];
      repository.items = items;

      const result = await repository.search(
        new SearchParams({
          page: 1,
          per_page: 2,
          sort: 'name',
          sort_dir: 'asc',
          filter: 'c',
        }),
      );

      expect(result).toEqual(
        new SearchResult({
          items: [items[3]],
          total: 1,
          current_page: 1,
          per_page: 2,
          sort: 'name',
          sort_dir: 'asc',
          filter: 'c',
        }),
      );
    });
  });
});
