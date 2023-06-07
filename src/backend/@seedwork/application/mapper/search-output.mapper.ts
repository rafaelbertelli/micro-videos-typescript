import { SearchResult } from '../../../../backend/@seedwork/repository';
import { PaginationDto } from '../dto/pagination.dto';

export class SearchOutputMapper {
  static toPagination(
    searchResults: SearchResult,
  ): Omit<PaginationDto, 'items'> {
    return {
      total: searchResults.total,
      current_page: searchResults.current_page,
      last_page: searchResults.last_page,
      per_page: searchResults.per_page,
    };
  }
}
