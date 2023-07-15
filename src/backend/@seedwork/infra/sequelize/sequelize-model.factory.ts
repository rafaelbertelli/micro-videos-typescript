export class SequelizeModelFactory {
  private _count = 1;

  constructor(private model, private factoryProps: () => any) {}

  async create(data?) {
    return this.model.create(data ?? this.factoryProps());
  }

  make(data?) {
    return this.model.build(data ?? this.factoryProps());
  }

  count(count: number) {
    this._count = count;
    return this;
  }

  async bulkCreate() {}

  bulkMake() {}
}
