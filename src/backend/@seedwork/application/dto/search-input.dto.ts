import { SortDirection } from '../../../../backend/@seedwork/repository';

export type SearchInputDto = {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
};
