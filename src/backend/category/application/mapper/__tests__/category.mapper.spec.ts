import { Category } from '../../../../../backend/category/domain/entities/category';
import { CategoryMapper } from '../category.mapper';

describe('Category Mapper', () => {
  it('should map a category', () => {
    const entity = new Category({ name: 'Ação' });
    const result = CategoryMapper.toOutput(entity);

    expect(result).toEqual({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    });
  });
});
