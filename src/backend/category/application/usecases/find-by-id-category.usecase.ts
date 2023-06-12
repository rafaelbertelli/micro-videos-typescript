import { Usecase } from '../../../../backend/@seedwork/application/usecase';
import { CategoryRepository } from '../../../../backend/category/domain/repository/category.repository';
import { CategoryDto } from '../dto/category.dto';
import { CategoryMapper } from '../mapper/category.mapper';

export class FindByIdCategoryUsecase implements Usecase<string, CategoryDto> {
  constructor(
    private readonly categoryRepository: CategoryRepository.Repository,
  ) {}

  async execute(id: string): Promise<CategoryDto> {
    try {
      const result = await this.categoryRepository.findById(id);
      return CategoryMapper.toOutput(result);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
