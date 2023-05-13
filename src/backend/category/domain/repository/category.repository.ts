import {
  SearchParams as SearchParamsContract,
  SearchResult as SearchResultContract,
  SearchebleRepositoryInterface,
} from '../../../@seedwork/repository/repository-contracts';
import { Category } from '../entities/category';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CategoryRepository {
  export type Filter = string;

  export class SearchParams extends SearchParamsContract<Filter> {}
  export class SearchResult extends SearchResultContract<Category, Filter> {}

  export type Repository = SearchebleRepositoryInterface<
    Category,
    Filter,
    SearchParams,
    SearchResult
  >;
}
