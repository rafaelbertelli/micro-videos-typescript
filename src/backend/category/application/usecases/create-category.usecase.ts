import { Usecase } from '../../../../backend/@seedwork/application';
import { Category } from '../../../../backend/category/domain/entities/category';
import { CategoryRepository } from '../../../../backend/category/domain/repository/category.repository';
import { CategoryDto } from '../dto/category.dto';
import { CategoryMapper } from '../mapper/category.mapper';

export class CreateCategoryUsecase implements Usecase<Input, CategoryDto> {
  constructor(
    private readonly categoryRepository: CategoryRepository.Repository,
  ) {}

  async execute(input: Input): Promise<CategoryDto> {
    try {
      const entity = new Category(input);
      await this.categoryRepository.insert(entity);

      return CategoryMapper.toOutput(entity);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export type Input = {
  name: string;
  description?: string;
  is_active?: boolean;
};
