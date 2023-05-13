import { SortDirection } from 'backend/@seedwork/repository/repository-contracts';
import { InMemorySearchableRepository } from '../../../@seedwork/repository/in-memory.repository';
import { Category } from '../../../category/domain/entities/category';
import { CategoryRepository } from '../../../category/domain/repository/category.repository';

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter,
  ): Category[] {
    if (!filter) {
      return items;
    }

    return items.filter(({ props }) =>
      props.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    );
  }

  protected applySort(
    items: Category[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Category[] {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}
