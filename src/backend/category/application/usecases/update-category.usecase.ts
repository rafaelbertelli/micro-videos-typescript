import { Usecase } from '../../../../backend/@seedwork/application/usecase';
import { CategoryRepository } from '../../../../backend/category/domain/repository/category.repository';
import { CategoryDto } from '../dto/category.dto';
import { CategoryMapper } from '../mapper/category.mapper';

export class UpdateCategoryUsecase implements Usecase<Input, CategoryDto> {
  constructor(
    private readonly categoryRepository: CategoryRepository.Repository,
  ) {}

  async execute(input: Input): Promise<CategoryDto> {
    const entity = await this.categoryRepository.findById(input.id);

    entity.update({ name: input.name, description: input.description });

    if (input.is_active === true) {
      entity.activate();
    }

    if (input.is_active === false) {
      entity.deactivate();
    }

    await this.categoryRepository.update(entity);

    return CategoryMapper.toOutput(entity);
  }
}

type Input = {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
};
