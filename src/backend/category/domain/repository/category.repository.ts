import { SearchebleRepositoryInterface } from '../../../@seedwork/repository/repository-contracts';
import { Category } from '../entities/category';

export interface CategoryRepository
  extends SearchebleRepositoryInterface<Category, any, any> {}
