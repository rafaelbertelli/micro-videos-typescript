import { Usecase } from '../../../../backend/@seedwork/application/usecase';
import { CategoryRepository } from '../../../../backend/category/domain/repository/category.repository';

export class DeleteCategoryUsecase implements Usecase<Input, void> {
  constructor(
    private readonly categoryRepository: CategoryRepository.Repository,
  ) {}

  async execute(input: Input): Promise<void> {
    try {
      return await this.categoryRepository.delete(input.id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

type Input = {
  id: string;
};
