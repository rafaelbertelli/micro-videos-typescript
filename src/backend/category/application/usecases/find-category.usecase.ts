import { CategoryRepository } from 'backend/category/domain/repository/category.repository';
import { Category } from '../../../category/domain/entities/category';

export class FindCategoryUsecase {
  constructor(
    private readonly categoryRepository: CategoryRepository.Repository,
  ) {}

  async execute(id: string): Promise<Category> {
    try {
      const result = await this.categoryRepository.findById(id);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
