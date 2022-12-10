import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '../../../@seedwork/validator/class-validator-fields';
import { CategoryProps } from '../entities/category';

export class CategoryRules {
  @MaxLength(99)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_active: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor(data: CategoryProps) {
    Object.assign(this, data);
  }
}

class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(data: CategoryProps): boolean {
    return super.validate(new CategoryRules(data));
  }
}

export class CategoryValidatorFactory extends CategoryValidator {
  static create() {
    return new CategoryValidator();
  }
}
