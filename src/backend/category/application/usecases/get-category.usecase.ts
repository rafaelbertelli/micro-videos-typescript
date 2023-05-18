import { CategoryRepository } from 'backend/category/domain/repository/category.repository';
import { Category } from '../../../category/domain/entities/category';

export class GetCategoryUsecase {
  constructor(
    private readonly categoryRepository: CategoryRepository.Repository,
  ) {}

  async execute(): Promise<Category[]> {
    try {
      const result = await this.categoryRepository.findAll();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
