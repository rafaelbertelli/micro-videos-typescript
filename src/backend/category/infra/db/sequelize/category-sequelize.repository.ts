import { Op } from 'sequelize';
import { NotFoundError } from '../../../../../backend/@seedwork/errors';
import {
  Category,
  CategoryRepository,
} from '../../../../../backend/category/domain';
import { CategoryModel } from './category.model';

export class CategorySequelizeRepository
  implements CategoryRepository.Repository
{
  constructor(private categoryModel: typeof CategoryModel) {}

  sortableFields = ['name', 'created_at'];

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJson());
  }

  async findById(id: string): Promise<Category> {
    const result = await this.categoryModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Entity ID: ${id} not found`),
    });
    return new Category(result.toJSON());
  }

  async findAll(): Promise<Category[]> {
    const result = await this.categoryModel.findAll();
    return result.map((item) => new Category(item.toJSON()));
  }

  async update(entity: Category): Promise<void> {
    await this.categoryModel.update(entity.toJson(), {
      where: { id: entity.id },
    });
  }

  async delete(id: string): Promise<void> {
    await this.categoryModel.destroy({ where: { id } });
  }

  async search(
    props: CategoryRepository.SearchParams,
  ): Promise<CategoryRepository.SearchResult> {
    // private _page: number;
    // private _per_page = 15;
    // private _sort: string;
    // private _sort_dir: SortDirection;
    // private _filter: Filter;

    const { rows: models, count } = await this.categoryModel.findAndCountAll({
      ...(props.filter && {
        where: {
          name: {
            [Op.like]: `%${props.filter}%`,
          },
        },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: [[props.sort, props.sort_dir]] }
        : { order: [['created_at', 'DESC']] }),
      offset: (props.page - 1) * props.per_page,
      limit: props.per_page,
    });

    return new CategoryRepository.SearchResult({
      items: models.map((item) => new Category(item.toJSON())),
      total: count,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    });
  }
}
