import { Category } from 'backend/category/domain/entities/category';
import { CategoryDto } from '../dto/category.dto';

export class CategoryMapper {
  static toOutput(entity: Category): CategoryDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    };
  }
}
