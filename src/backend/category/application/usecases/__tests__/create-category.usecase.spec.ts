import { CategoryInMemoryRepository } from '../../../infra/repository/category-in-memory.repository';
import { CreateCategoryUsecase } from '../create-category.usecase';

describe('CreateCategoryUsecase', () => {
  let repository: CategoryInMemoryRepository;
  let usecase: CreateCategoryUsecase;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new CreateCategoryUsecase(repository);
  });

  it('should create a new category', async () => {
    const spyOnInsert = jest.spyOn(repository, 'insert');
    let result = await usecase.execute({ name: 'Teste' });

    expect(result).toStrictEqual({
      id: repository.items[0].id,
      name: 'Teste',
      description: undefined,
      is_active: false,
      created_at: repository.items[0].created_at,
    });
    expect(spyOnInsert).toHaveBeenCalled();

    result = await usecase.execute({
      name: 'Teste',
      description: 'Teste Description',
    });
    expect(result).toStrictEqual({
      id: repository.items[1].id,
      name: 'Teste',
      description: 'Teste Description',
      is_active: false,
      created_at: repository.items[1].created_at,
    });

    result = await usecase.execute({
      name: 'Teste 3',
      description: 'Teste Description 3',
      is_active: true,
    });
    expect(result).toStrictEqual({
      id: repository.items[2].id,
      name: 'Teste 3',
      description: 'Teste Description 3',
      is_active: true,
      created_at: repository.items[2].created_at,
    });
  });
});
