import { PaginationDto } from './pagination.dto';

export type SearchResultDto<E> = {
  items: E[];
} & PaginationDto;
