import { ValidationError } from '../errors/validation.error';

export class ValidatorRules {
  private constructor(private value: any, private property: string) {}

  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }

  required(): Omit<this, 'required'> {
    const forbiddenItems = [null, undefined, ''];
    if (forbiddenItems.includes(this.value)) {
      throw new ValidationError(`Property "${this.property}" is required`);
    }

    return this;
  }

  string(): Omit<this, 'string'> {
    if (this.isNotEmpty() && typeof this.value !== 'string') {
      throw new ValidationError(`Property "${this.property}" must be string`);
    }

    return this;
  }

  maxLength(max: number): Omit<this, 'maxLength'> {
    if (this.isNotEmpty() && this.value.length >= max) {
      const msg = `Property "${this.property}" must be less than ${max} chatacteres`;
      throw new ValidationError(msg);
    }

    return this;
  }

  boolean(): Omit<this, 'boolean'> {
    if (this.isNotEmpty() && typeof this.value !== 'boolean') {
      const msg = `Property "${this.property}" must be boolean`;
      throw new ValidationError(msg);
    }

    return this;
  }

  private isEmpty(): boolean {
    return this.value === undefined || this.value === null;
  }

  private isNotEmpty(): boolean {
    return !this.isEmpty();
  }
}
