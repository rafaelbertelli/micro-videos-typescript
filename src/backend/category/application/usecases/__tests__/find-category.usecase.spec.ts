import { NotFoundError } from '../../../../@seedwork/errors/not-found.error';
import { Category } from '../../../../category/domain/entities/category';
import { CategoryInMemoryRepository } from '../../../infra/repository/category-in-memory.repository';
import { FindCategoryUsecase } from '../find-category.usecase';

describe('FindCategoryUsecase', () => {
  let repository: CategoryInMemoryRepository;
  let usecase: FindCategoryUsecase;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new FindCategoryUsecase(repository);
  });

  it('should create find a category', async () => {
    const entities = [
      new Category({ name: 'Primaira', description: 'AAA' }),
      new Category({ name: 'Segunda', description: 'XXX' }),
    ];
    repository.items = entities;

    const spyOnFindById = jest.spyOn(repository, 'findById');
    const result = await usecase.execute(entities[1].id);

    expect(spyOnFindById).toHaveBeenCalled();
    expect(result.name).toBe(entities[1].name);
    expect(result.description).toBe(entities[1].description);
  });

  it('should throw error when entity is not found', async () => {
    const entities = [
      new Category({ name: 'Primaira', description: 'AAA' }),
      new Category({ name: 'Segunda', description: 'XXX' }),
    ];

    const spyOnFindById = jest.spyOn(repository, 'findById');

    expect(
      async () => await repository.findById(entities[1].id),
    ).rejects.toThrow(
      new NotFoundError(`Entity ID: ${entities[1].id} not found`),
    );

    expect(spyOnFindById).toHaveBeenCalled();
  });
});
