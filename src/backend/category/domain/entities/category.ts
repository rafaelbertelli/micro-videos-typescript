import { Entity } from '../../../@seedwork/domain/entity/entity';
import { CategoryValidatorFactory } from '../validators/category.validator';

export type CategoryProps = {
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

export class Category extends Entity<CategoryProps> {
  constructor(protected readonly props: CategoryProps) {
    Category.validate(props);
    super(props, props.id);

    this.name = props.name;
    this.description = props.description;
    this.is_active = props.is_active;
    this.created_at = props.created_at;
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
    Category.validate({ name, description });

    this.name = name;
    this.description = description;
  }

  // static validate(props: Omit<CategoryProps, 'id' | 'created_at'>) {
  //   ValidatorRules.values(props.name, 'name').required().string().maxLength(99);
  //   ValidatorRules.values(props.description, 'description').string();
  //   ValidatorRules.values(props.is_active, 'is_active').boolean();
  // }

  static validate(props: CategoryProps) {
    const validator = CategoryValidatorFactory.create();
    validator.validate(props);
  }
}
