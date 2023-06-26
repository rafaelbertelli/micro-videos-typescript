import { Category } from '../../../../../../backend/category/domain';
import { CategoryInMemoryRepository } from '../category-in-memory.repository';

describe('CategoryInMemoryRepository', () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
  });

  it('should no filter when it is null', () => {
    const items = [new Category({ name: 'Category Test' })];
    const spyOnFilter = jest.spyOn(items, 'filter');

    const filteredItems = repository['applyFilter'](items, null);
    expect(spyOnFilter).not.toHaveBeenCalled();
    expect(filteredItems).toEqual(items);
  });

  it('should filter by name', () => {
    const items = [
      new Category({ name: 'test' }),
      new Category({ name: 'TEST' }),
      new Category({ name: 'fake' }),
    ];
    const spyOnFilter = jest.spyOn(items, 'filter');

    const filteredItems = repository['applyFilter'](items, 'TEST');
    expect(spyOnFilter).toHaveBeenCalledTimes(1);
    expect(filteredItems).toEqual([items[0], items[1]]);
  });

  it('should filter by created_at when sort is null', () => {
    const created_at = new Date();
    const items = [
      new Category({
        name: 'test',
        created_at: new Date(created_at.getTime() + 0),
      }),
      new Category({
        name: 'TEST',
        created_at: new Date(created_at.getTime() + 100),
      }),
      new Category({
        name: 'fake',
        created_at: new Date(created_at.getTime() + 200),
      }),
    ];

    const filteredItems = repository['applySort'](items, null, null);
    expect(filteredItems).toEqual([items[2], items[1], items[0]]);
  });

  it('should sort by name', () => {
    const items = [
      new Category({ name: 'c' }),
      new Category({ name: 'b' }),
      new Category({ name: 'a' }),
    ];

    let filteredItems = repository['applySort'](items, 'name', 'asc');
    expect(filteredItems).toEqual([items[2], items[1], items[0]]);

    filteredItems = repository['applySort'](items, 'name', 'desc');
    expect(filteredItems).toEqual([items[0], items[1], items[2]]);
  });
});
