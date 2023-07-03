import { Sequelize } from 'sequelize-typescript';
import { CategoryModel } from '../category.model';
import { Category } from '../../../../../../backend/category/domain';
import { CategorySequelizeRepository } from '../category-sequelize.repository';

describe('CategorySequelizeRepository', () => {
  let sequelize: Sequelize;
  let repository: CategorySequelizeRepository;

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      host: ':memory:',
      logging: false,
      models: [CategoryModel],
    });
  });

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should be able to create a category', async () => {
    let category = new Category({ name: 'Mais uma vez' });
    await repository.insert(category);
    let model = await CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toStrictEqual(category.toJson());

    category = new Category({
      name: 'Mais 2',
      description: 'Descri',
      is_active: true,
    });
    await repository.insert(category);
    model = await CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toStrictEqual(category.toJson());
  });
});
