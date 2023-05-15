import { CategoryRepository } from 'backend/category/domain/repository/category.repository';
import { Category } from '../../../category/domain/entities/category';

export class CreateCategoryUsecase {
  constructor(
    private readonly categoryRepository: CategoryRepository.Repository,
  ) {}

  async execute(input: Input): Promise<Output> {
    try {
      const entity = new Category(input);
      await this.categoryRepository.insert(entity);

      return {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        is_active: entity.is_active,
        created_at: entity.created_at,
      };
    } catch (error) {
      console.error(error);
    }
  }
}

export type Input = {
  name: string;
  description?: string;
  is_active?: boolean;
};

export type Output = {
  id: string;
  name: string;
  description: string | undefined;
  is_active: boolean;
  created_at: Date;
};
