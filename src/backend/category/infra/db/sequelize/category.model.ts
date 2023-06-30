import { DataTypes } from 'sequelize';
import { Column, PrimaryKey, Table, Model } from 'sequelize-typescript';

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
}
