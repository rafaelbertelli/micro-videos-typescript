import { DataTypes } from 'sequelize';
import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { SequelizeModelFactory } from '../../../../../backend/@seedwork/infra/sequelize';

type CategoryModelProperties = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};

@Table({ tableName: 'categories', timestamps: false })
export class CategoryModel extends Model<CategoryModelProperties> {
  @PrimaryKey
  @Column({
    type: DataTypes.UUID,
  })
  declare id: string;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataTypes.TEXT,
  })
  declare description: string | null;

  @Column({
    allowNull: false,
  })
  declare is_active: boolean;

  @Column({
    allowNull: false,
  })
  declare created_at: Date;

  static factory() {
    const chance: Chance.Chance = require('chance')();

    return new SequelizeModelFactory(CategoryModel, () => ({
      id: chance.guid({ version: 4 }),
      name: chance.name(),
      description: chance.sentence(),
      is_active: true,
      created_at: chance.date(),
    }));
  }
}
