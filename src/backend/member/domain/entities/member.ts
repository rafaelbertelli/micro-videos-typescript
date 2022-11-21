import { UniqueEntityId } from '../../../@seedwork/domain/value-objects/unique-entity-id';

export type MemberProps = {
  id?: string;
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

type UpdateProps = {
  name: string;
  description?: string;
};

export class Member {
  constructor(private props: MemberProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.is_active = props.is_active;
    this.created_at = props.created_at;
  }

  get id(): string {
    return this.props.id;
  }

  private set id(value: string | undefined) {
    this.props.id = new UniqueEntityId(value).value;
  }

  get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    if (value) this.props.name = value;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  private set description(value: string) {
    if (value) {
      this.props.description = value;
    } else if (value === '') {
      this.props.description = undefined;
    }
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  private set is_active(value: boolean | undefined) {
    this.props.is_active = value ?? false;
  }

  get created_at(): Date | undefined {
    return this.props.created_at;
  }

  private set created_at(value: Date | undefined) {
    this.props.created_at = value ?? new Date();
  }

  activate(): void {
    this.props.is_active = true;
  }

  deactivate(): void {
    this.props.is_active = false;
  }

  update({ name, description }: UpdateProps): void {
    this.name = name;
    this.description = description;
  }
}
