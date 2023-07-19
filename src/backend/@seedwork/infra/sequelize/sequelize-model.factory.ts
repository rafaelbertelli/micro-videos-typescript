import { Model } from 'sequelize-typescript';

export class SequelizeModelFactory<ModelClass extends Model, ModelProps = any> {
  private _count = 1;

  count(count: number) {
    this._count = count;
    return this;
  }

  constructor(private model, private defaultFactoryProps: () => ModelProps) {}

  async create(data?: ModelProps): Promise<ModelClass> {
    return await this.model.create(data ?? this.defaultFactoryProps());
  }

  make(data?: ModelProps): ModelClass {
    return this.model.build(data ?? this.defaultFactoryProps());
  }

  async bulkCreate(
    factoryProps?: (index: number) => ModelProps,
  ): Promise<ModelClass[]> {
    const data = new Array(this._count)
      .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
      .map((factory, index) => factory(index));

    return await this.model.bulkCreate(data);
  }

  bulkMake(factoryProps?: (index: number) => ModelProps): ModelClass[] {
    const data = new Array(this._count)
      .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
      .map((factory, index) => factory(index));

    return this.model.bulkBuild(data);
  }
}
