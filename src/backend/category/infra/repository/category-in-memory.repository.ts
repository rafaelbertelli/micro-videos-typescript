import { Category } from '../../../category/domain/entities/category';
import { InMemoryRepository } from '../../../@seedwork/repository/in-memory.repository';
import { CategoryRepository } from '../../../category/domain/repository/category.repository';

export class CategoryInMemoryRepository
  extends InMemoryRepository<Category>
  implements CategoryRepository
{
  search(props: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
