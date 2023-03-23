import { Entity } from '../domain/entity/entity';

export type SortDirection = 'asc' | 'desc';
export type SearchProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: Filter;
};

export class SearchParams<Filter> {
  private _page: number;
  private _per_page: number;
  private _sort: string;
  private _sort_dir: SortDirection;
  private _filter: Filter;

  constructor(props: SearchProps<Filter> = {}) {
    this.page = props.page;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
  }

  get page() {
    return this._page;
  }
  private set page(value) {
    let _page = +value || 1;
    _page = parseInt(_page + '');
    this._page = _page <= 0 ? 1 : _page;
  }

  get per_page() {
    return this._per_page;
  }
  private set per_page(value) {
    let _per_page = +value || 15;
    _per_page = parseInt(_per_page + '');
    this._per_page = _per_page <= 0 ? 15 : _per_page;
  }

  get sort() {
    return this._sort;
  }
  private set sort(value) {
    if (value === undefined || value === null || value === '') {
      this._sort = null;
    } else {
      this._sort = `${value}`;
    }
  }

  get sort_dir() {
    return this._sort_dir;
  }
  private set sort_dir(value) {
    this._sort_dir = value || 'desc';
  }

  get filter() {
    return this._filter;
  }
  private set filter(value) {
    if (value === undefined || value === null || value === '') {
      this._filter = null;
    } else {
      this._filter = `${value}` as Filter;
    }
  }
}

export type SearchResultProps<E extends Entity, Filter = string> = {
  items: E[];
  total: number;
  current_page: number;
  per_page: number;
  // last_page: number;
  sort: string | null;
  sort_dir: string | null;
  filter: Filter | null;
};

export class SearchResult<E extends Entity, Filter> {
  readonly items: E[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly last_page: number;
  readonly sort: string | null;
  readonly sort_dir: string | null;
  readonly filter: Filter;

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.last_page = Math.ceil(this.total / this.per_page);
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      last_page: this.last_page,
      sort: this.sort,
      sort_dir: this.sort_dir,
      filter: this.filter,
    };
  }
}

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface SearchebleRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams<string>,
  SearchOutput = SearchResult<E, Filter>,
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}
