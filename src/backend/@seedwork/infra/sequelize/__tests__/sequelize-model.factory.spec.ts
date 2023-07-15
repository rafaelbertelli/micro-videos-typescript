import * as _chance from 'chance';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Sequelize,
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

  it('should be defined', () => {
    expect(SequelizeModelFactory).toBeDefined();
  });

  it('create method', async () => {
    const model = await StubModel.factory().create();
    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalled();

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
});
