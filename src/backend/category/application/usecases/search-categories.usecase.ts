import { SearchInputDto } from 'backend/@seedwork/application/dto/search-input.dto';
import { SearchResultDto } from 'backend/@seedwork/application/dto/search-result.dto';
import { SearchOutputMapper } from 'backend/@seedwork/application/mapper/search-output.mapper';
import { Usecase } from '../../../../backend/@seedwork/application/usecase';
import { CategoryRepository } from '../../../../backend/category/domain/repository/category.repository';
import { CategoryDto } from '../dto/category.dto';
import { CategoryMapper } from '../mapper/category.mapper';

export class FindByIdCategoryUsecase
  implements Usecase<SearchInputDto, SearchResultDto<CategoryDto>>
{
  constructor(
    private readonly categoryRepository: CategoryRepository.Repository,
  ) {}

  async execute(input: SearchInputDto): Promise<SearchResultDto<CategoryDto>> {
    try {
      const params = new CategoryRepository.SearchParams(input);
      const result = await this.categoryRepository.search(params);

      return this.toOutput(result);
    } catch (error) {
      console.error(error);
    }
  }

  private toOutput(
    searchResult: CategoryRepository.SearchResult,
  ): SearchResultDto<CategoryDto> {
    return {
      items: searchResult.items.map(CategoryMapper.toOutput),
      ...SearchOutputMapper.toPagination(searchResult),
    };
  }
}
