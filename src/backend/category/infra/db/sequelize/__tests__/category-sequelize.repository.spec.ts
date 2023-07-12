import { Sequelize } from 'sequelize-typescript';
import { NotFoundError } from '../../../../../../backend/@seedwork/errors';
import {
  Category,
  CategoryRepository,
} from '../../../../../../backend/category/domain';
import { CategorySequelizeRepository } from '../category-sequelize.repository';
import { CategoryModel } from '../category.model';

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

  describe('insert', () => {
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

  describe('findById', () => {
    it('should be able to find a category', async () => {
      let category = new Category({ name: 'Mais uma vez' });
      await repository.insert(category);
      let model = await repository.findById(category.id);
      expect(model.toJson()).toStrictEqual(category.toJson());
    });

    it('should throw an error when category is not found', async () => {
      // ASSIM FUNCIONA
      try {
        await repository.findById('fake-id');
      } catch (error) {
        expect(error).toStrictEqual(
          new NotFoundError(`Entity ID: fake-id not found`),
        );
      }

      // TANTO QUANTO ASSIM
      await expect(repository.findById('fake-id')).rejects.toThrow(
        new NotFoundError(`Entity ID: fake-id not found`),
      );
    });
  });

  describe('findAll', () => {
    it('should be able to findAll', async () => {
      const category1 = new Category({ name: 'Mais uma vez 1' });
      const category2 = new Category({ name: 'Mais uma vez 2' });
      await CategoryModel.bulkCreate([category1.toJson(), category2.toJson()]);
      const result = await repository.findAll();
      expect(result).toHaveLength(2);
      expect(result[0].toJson()).toStrictEqual(category1.toJson());
      expect(result[1].toJson()).toStrictEqual(category2.toJson());
    });
  });

  describe('search', () => {
    it('should be able to search', async () => {
      const category1 = new Category({ name: 'Mais uma vez 1' });
      const category2 = new Category({ name: 'Mais uma vez 2' });

      await CategoryModel.bulkCreate([category1.toJson(), category2.toJson()]);

      const result = await repository.search(
        new CategoryRepository.SearchParams({
          filter: 'mais',
        }),
      );

      expect(result.items).toHaveLength(2);
      expect(result.items[0].toJson()).toStrictEqual(category1.toJson());
      expect(result.items[1].toJson()).toStrictEqual(category2.toJson());
    });
  });
});
