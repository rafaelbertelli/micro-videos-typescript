import { Sequelize } from 'sequelize-typescript';
import { CategoryModel } from './category.model';

describe('CategoryModel', () => {
  let sequelize: Sequelize;

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      host: ':memory:',
      logging: false,
      models: [CategoryModel],
    });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should be defined', () => {
    expect(sequelize).toBeDefined();
    expect(CategoryModel).toBeDefined();
  });

  it('should create a category', async () => {
    const opts = {
      id: 'd1942dfc-ecbe-41e3-9359-b6abef4a2d0d',
      name: 'Filme de teste 1',
      description: 'Vai descrevendo',
      created_at: new Date(),
      is_active: true,
    };

    CategoryModel.create(opts);
    const category = await CategoryModel.findOne({ where: { id: opts.id } });

    expect(category).toBeDefined();
    expect(category.id).toEqual(opts.id);
    expect(category.name).toEqual(opts.name);
    expect(category.name).toEqual(opts.name);
    expect(category.description).toEqual(opts.description);
    expect(category.created_at).toEqual(opts.created_at);
    expect(category.is_active).toEqual(opts.is_active);
    expect(category.toJSON()).toEqual(opts);
  });
});
