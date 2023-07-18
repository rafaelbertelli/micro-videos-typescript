import * as _chance from 'chance';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { validate as uuidValidate } from 'uuid';
import { SequelizeModelFactory } from '../';
import { setupSequelize } from '../../testing/helpers.db';

const chance = _chance.Chance();

@Table({ tableName: 'test-table' })
class StubModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name: string;

  static mockFactory = jest.fn(() => ({
    id: chance.guid({ version: 4 }),
    name: chance.name(),
  }));

  static factory() {
    return new SequelizeModelFactory(StubModel, StubModel.mockFactory);
  }
}

describe('SequelizeModelFactory', () => {
  setupSequelize({ models: [StubModel] });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(SequelizeModelFactory).toBeDefined();
  });

  test('create method', async () => {
    const model = await StubModel.factory().create();
    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.id).not.toBeNull();
    expect(model.name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

    const modelFound = await StubModel.findByPk(model.id);
    expect(modelFound).toBeDefined();
    expect(modelFound.toJSON().name).toEqual(model.name);

    const params = {
      id: chance.guid({ version: 4 }),
      name: chance.name(),
    };
    const modelWithData = await StubModel.factory().create(params);
    expect(modelWithData.toJSON().id).toEqual(params.id);
    expect(modelWithData.toJSON().name).toEqual(params.name);
  });

  test('make method', async () => {
    const model = await StubModel.factory().make();
    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.id).not.toBeNull();
    expect(model.name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

    const params = {
      id: chance.guid({ version: 4 }),
      name: chance.name(),
    };
    const modelWithData = await StubModel.factory().make(params);
    expect(modelWithData.toJSON().id).toEqual(params.id);
    expect(modelWithData.toJSON().name).toEqual(params.name);
  });

  test('bulkCreate method using empty param', async () => {
    const models = await StubModel.factory().bulkCreate();

    expect(models).toHaveLength(1);
    expect(uuidValidate(models[0].id)).toBeTruthy();
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

    const modelFound = await StubModel.findByPk(models[0].id);
    expect(modelFound.toJSON().id).toEqual(models[0].id);
    expect(modelFound.toJSON().name).toEqual(models[0].name);
  });

  test('bulkCreate method using one param', async () => {
    const params = {
      id: chance.guid({ version: 4 }),
      name: chance.name(),
    };

    const models = await StubModel.factory().bulkCreate(() => params);

    expect(models).toHaveLength(1);
    expect(uuidValidate(models[0].id)).toBeTruthy();
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(StubModel.mockFactory).not.toHaveBeenCalled();

    const modelFound = await StubModel.findByPk(params.id);
    expect(modelFound.toJSON().id).toEqual(params.id);
    expect(modelFound.toJSON().name).toEqual(params.name);
  });

  test('bulkCreate method using empty param and count gt 1', async () => {
    const models = await StubModel.factory().count(5).bulkCreate();

    expect(models).toHaveLength(5);
    expect(uuidValidate(models[0].id)).toBeTruthy();
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(5);

    const modelFound1 = await StubModel.findByPk(models[0].id);
    expect(modelFound1.toJSON().id).toEqual(models[0].id);
    expect(modelFound1.toJSON().name).toEqual(models[0].name);

    const modelFound3 = await StubModel.findByPk(models[2].id);
    expect(modelFound3.toJSON().id).toEqual(models[2].id);
    expect(modelFound3.toJSON().name).toEqual(models[2].name);
  });

  test('bulkCreate method using one param and count gt 1', async () => {
    const models = await StubModel.factory()
      .count(2)
      .bulkCreate(() => ({
        id: chance.guid({ version: 4 }),
        name: chance.name(),
      }));

    expect(models).toHaveLength(2);
    expect(uuidValidate(models[0].id)).toBeTruthy();
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(StubModel.mockFactory).not.toHaveBeenCalledTimes(2);

    expect(models[0].id).not.toEqual(models[1].id);
    expect(models[0].name).not.toEqual(models[1].name);
  });
});
