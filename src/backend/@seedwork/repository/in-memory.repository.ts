import { Entity } from '../domain/entity/entity';
import { NotFoundError } from '../errors/not-found.error';
import {
  RepositoryInterface,
  SearchebleRepositoryInterface,
  SearchParams,
  SearchResult,
  SortDirection,
} from './repository-contracts';

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string): Promise<E> {
    const result = this.items.find((item) => item.id === id);

    if (!result) {
      throw new NotFoundError(`Entity ID: ${id} not found`);
    }

    return result;
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    const register = await this.findById(entity.id);
    const index = this.items.findIndex((item) => item.id === register.id);
    this.items[index] = entity;
  }

  async delete(id: string): Promise<void> {
    const register = await this.findById(id);
    const index = this.items.findIndex((item) => item.id === register.id);
    this.items.splice(index, 1);
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchebleRepositoryInterface<E>
{
  abstract sortableFields: string[];

  async search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = this.applyFilter(this.items, props.filter);

    const itemsSorted = this.applySort(
      itemsFiltered,
      props.sort,
      props.sort_dir,
    );

    const itemsPaginated = this.applyPaginate(
      itemsSorted,
      props.page,
      props.per_page,
    );

    return new SearchResult({
      items: itemsPaginated,
      total: itemsSorted.length,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    });
  }

  protected abstract applyFilter(items: E[], filter: string | null): E[];

  protected applySort(
    items: E[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): E[] {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }

    if (sort_dir !== 'asc' && sort_dir !== 'desc') {
      throw new Error(`Invalid sort direction: ${sort_dir}`);
    }

    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sort_dir === 'asc' ? -1 : 1;
      }

      if (a.props[sort] > b.props[sort]) {
        return sort_dir === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  protected applyPaginate(
    items: E[],
    page: number | null,
    per_page: number | null,
  ): E[] {
    const page_num = page ? parseInt(`${page}`, 10) : 1;
    const per_page_num = per_page ? parseInt(`${per_page}`, 10) : items.length;
    const start = (page_num - 1) * per_page_num;
    const end = start + per_page_num;

    return items.slice(start, end);
  }
}

// ordem
// 1 filtro
// 2 ordenacao
// 3 paginacao
