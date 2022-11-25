import { ValidationError } from '../errors/validation.error';

export class ValidatorRules {
  private constructor(private value: any, private property: string) {}

  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }

  required(): this {
    const forbiddenItems = [null, undefined, ''];
    if (forbiddenItems.includes(this.value)) {
      throw new ValidationError(`Property "${this.value}" is required`);
    }

    return this;
  }

  string(): this {
    if (typeof this.value !== 'string') {
      throw new ValidationError(`Property "${this.value}" must be string`);
    }

    return this;
  }

  maxLength(max: number): this {
    if (this.value.maxLength > max) {
      const msg = `Property "${this.value}" must be less than ${max} chatacteres`;
      throw new ValidationError(msg);
    }

    return this;
  }
}
