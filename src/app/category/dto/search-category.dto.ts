export class SearchCategoryDto {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: 'asc' | 'desc';
  filter?: string;
}
