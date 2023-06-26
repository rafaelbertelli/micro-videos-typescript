import { CategoryInMemoryRepository } from '../../../../../backend/category/infra';
import { Category } from '../../../../category/domain/entities/category';
import { FindAllCategoriesUsecase } from '../find-all-categories.usecase';

describe('FindAllCategoriesUsecase', () => {
  let repository: CategoryInMemoryRepository;
  let usecase: FindAllCategoriesUsecase;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new FindAllCategoriesUsecase(repository);
  });

  it('should get all categories', async () => {
    const entities = [
      new Category({ name: 'Primaira' }),
      new Category({ name: 'Segunda' }),
    ];
    repository.items = entities;

    const spyOnFindAll = jest.spyOn(repository, 'findAll');
    const result = await usecase.execute();

    expect(spyOnFindAll).toHaveBeenCalled();
    expect(result.length).toBe(entities.length);
    expect(result[0].name).toBe(entities[0].name);
    expect(result[1].name).toBe(entities[1].name);
  });

  it('should return an empty array if there are no categories', async () => {
    const result = await usecase.execute();

    expect(result.length).toBe(0);
    expect(result).toEqual([]);
    expect(result).toBeInstanceOf(Array);
    expect(result).not.toBeInstanceOf(Category);
  });
});
