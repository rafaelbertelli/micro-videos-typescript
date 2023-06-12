import { NotFoundError } from '../../../../../backend/@seedwork/errors';
import { Category } from '../../../../category/domain/entities/category';
import { CategoryInMemoryRepository } from '../../../infra/repository/category-in-memory.repository';
import { DeleteCategoryUsecase } from '../delete-category.usecase';

describe('DeleteCategoryUsecase', () => {
  let repository: CategoryInMemoryRepository;
  let usecase: DeleteCategoryUsecase;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new DeleteCategoryUsecase(repository);
  });

  it('should delete a category', async () => {
    const category_1 = new Category({ name: 'Primeira', description: 'AAA' });
    const category_2 = new Category({ name: 'Segunda', description: 'XXX' });

    const entities = [category_1, category_2];
    repository.items = entities;

    const spyOnDelete = jest.spyOn(repository, 'delete');
    const result = await usecase.execute({ id: entities[0].id });

    expect(spyOnDelete).toHaveBeenCalled();
    expect(result).toBeUndefined();
    expect(entities.length).toBe(1);
    expect(entities).toStrictEqual([category_2]);
  });

  it('should not delete a category', async () => {
    const spyOnDelete = jest.spyOn(repository, 'delete');

    try {
      const input = { id: 'fake id', name: 'Primeira' };
      await usecase.execute({ id: input.id });
    } catch (error) {
      expect(error).toStrictEqual(
        new NotFoundError(`Entity ID: fake id not found`),
      );
    }

    expect(spyOnDelete).toHaveBeenCalled();
  });
});
