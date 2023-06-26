import { CategoryInMemoryRepository } from '../../../../../backend/category/infra';
import { NotFoundError } from '../../../../@seedwork/errors/not-found.error';
import { Category } from '../../../../category/domain/entities/category';
import { UpdateCategoryUsecase } from '../update-category.usecase';

describe('UpdateCategoryUsecase', () => {
  let repository: CategoryInMemoryRepository;
  let usecase: UpdateCategoryUsecase;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new UpdateCategoryUsecase(repository);
  });

  it('should update a category', async () => {
    const entities = [
      new Category({ name: 'Primeira', description: 'AAA' }),
      new Category({ name: 'Segunda', description: 'XXX' }),
    ];
    repository.items = entities;

    const spyOnUpdate = jest.spyOn(repository, 'update');
    let result = await usecase.execute({
      id: entities[0].id,
      name: 'Teste',
      description: 'Teste Description',
    });

    expect(result).toStrictEqual({
      id: repository.items[0].id,
      name: 'Teste',
      description: 'Teste Description',
      is_active: false,
      created_at: repository.items[0].created_at,
    });
    expect(spyOnUpdate).toHaveBeenCalled();

    result = await usecase.execute({
      id: entities[0].id,
      name: 'Teste',
      description: 'Teste Description',
      is_active: false,
    });

    expect(result).toStrictEqual({
      id: repository.items[0].id,
      name: 'Teste',
      description: 'Teste Description',
      is_active: false,
      created_at: repository.items[0].created_at,
    });

    result = await usecase.execute({
      id: entities[0].id,
      name: 'Teste',
      description: 'Teste Description',
      is_active: true,
    });

    expect(result).toStrictEqual({
      id: repository.items[0].id,
      name: 'Teste',
      description: 'Teste Description',
      is_active: true,
      created_at: repository.items[0].created_at,
    });
  });

  it('should not update a category', async () => {
    const spyOnFindById = jest.spyOn(repository, 'findById');

    const input = { id: 'fake id', name: 'Primeira' };
    expect(async () => await usecase.execute(input)).rejects.toThrow(
      new NotFoundError(`Entity ID: fake id not found`),
    );

    expect(spyOnFindById).toHaveBeenCalled();
  });
});
