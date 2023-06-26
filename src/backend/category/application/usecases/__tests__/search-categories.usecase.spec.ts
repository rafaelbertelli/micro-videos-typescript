import { SearchInputDto } from '../../../../../backend/@seedwork/application/dto/search-input.dto';
import { Category } from '../../../../../backend/category/domain/entities/category';
import { CategoryInMemoryRepository } from '../../../../../backend/category/infra';
import { SearchCategoriesUsecase } from '../search-categories.usecase';

describe('SearchCategoriesUsecase', () => {
  let repository: CategoryInMemoryRepository;
  let usecase: SearchCategoriesUsecase;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new SearchCategoriesUsecase(repository);

    const entities = [
      new Category({ name: 'Primaira' }),
      new Category({ name: 'Segunda' }),
    ];
    repository.items = entities;
  });

  it('should find all categories', async () => {
    const params: SearchInputDto = {};
    const result = await usecase.execute(params);

    expect(result.items).toHaveLength(2);
    expect(result.total).toBe(2);
    expect(result.current_page).toBe(1);
    expect(result.last_page).toBe(1);
    expect(result.per_page).toBe(15);
  });
});
