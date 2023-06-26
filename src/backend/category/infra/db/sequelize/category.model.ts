import { DataTypes, Model } from 'sequelize';
import { Column, PrimaryKey, Table } from 'sequelize-typescript';

type CategoryModelProperties {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

}

@Table({ tableName: 'categories', timestamps: false })
export class CategoryModel extends Model<CategoryModelProperties> {
  @PrimaryKey
  @Column({
    type: DataTypes.UUID,
  })
  id: string;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataTypes.TEXT,
  })
  description: string | null;

  @Column({
    allowNull: false,
  })
  is_active: boolean;

  @Column({
    allowNull: false,
  })
  created_at: Date;
}
