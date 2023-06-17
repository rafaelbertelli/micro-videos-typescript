import { Usecase } from '../../../../backend/@seedwork/application/usecase';
import { CategoryRepository } from '../../../../backend/category/domain/repository/category.repository';
import { CategoryDto } from '../dto/category.dto';
import { CategoryMapper } from '../mapper/category.mapper';

export class FindAllCategoriesUsecase implements Usecase<'', CategoryDto[]> {
  constructor(
    private readonly categoryRepository: CategoryRepository.Repository,
  ) {}

  async execute(): Promise<CategoryDto[]> {
    try {
      const result = await this.categoryRepository.findAll();

      return result.map(CategoryMapper.toOutput);
    } catch (error) {
      throw error;
    }
  }
}
