export class SequelizeModelFactory {
  private _count = 1;

  count(count: number) {
    this._count = count;
    return this;
  }

  constructor(private model, private defaultFactoryProps: () => any) {}

  async create(data?) {
    return this.model.create(data ?? this.defaultFactoryProps());
  }

  make(data?) {
    return this.model.build(data ?? this.defaultFactoryProps());
  }

  async bulkCreate(factoryProps?: (index: number) => any) {
    const data = new Array(this._count)
      .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
      .map((factory, index) => factory(index));

    return this.model.bulkCreate(data);
  }

  bulkMake() {}
}
