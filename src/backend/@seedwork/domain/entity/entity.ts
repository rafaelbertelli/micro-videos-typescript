import { UniqueEntityId } from '../value-objects/unique-entity-id';

export abstract class Entity<Props> {
  private readonly uniqueEntityId: UniqueEntityId;

  constructor(protected readonly props: Props, id?: string) {
    this.uniqueEntityId = new UniqueEntityId(id);
  }

  get id(): string {
    return this.uniqueEntityId.value;
  }

  toJson(): Props & { id: string } {
    return {
      ...this.props,
      id: this.id,
    };
  }
}
