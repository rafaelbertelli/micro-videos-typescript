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

  sortableFields: ['name', 'created_at'];

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
    throw new Error('Method not implemented.');
  }
}