import { CategoryProps } from '../../entities/category';
import { CategoryValidatorFactory } from '../category.validator';

describe('Category Validator', () => {
  let validator: CategoryValidatorFactory;

  beforeEach(() => {
    validator = CategoryValidatorFactory.create();
  });

  test('invalid cases for name field', () => {
    let isValid;

    isValid = validator.validate(null);
    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      'name should not be empty',
      'name must be a string',
      'name must be shorter than or equal to 99 characters',
    ]);

    isValid = validator.validate({ name: '' });
    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      'name should not be empty',
    ]);

    isValid = validator.validate({ name: undefined });
    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      'name should not be empty',
      'name must be a string',
      'name must be shorter than or equal to 99 characters',
    ]);

    isValid = validator.validate({ name: undefined });
    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      'name should not be empty',
      'name must be a string',
      'name must be shorter than or equal to 99 characters',
    ]);

    isValid = validator.validate({ name: null });
    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      'name should not be empty',
      'name must be a string',
      'name must be shorter than or equal to 99 characters',
    ]);

    isValid = validator.validate({ name: 'r'.repeat(100) });
    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      'name must be shorter than or equal to 99 characters',
    ]);

    isValid = validator.validate({ name: 5 as any });
    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      'name must be a string',
      'name must be shorter than or equal to 99 characters',
    ]);
  });

  test('valid cases for fields', () => {
    let params: CategoryProps;

    params = { name: 'Rafael' };
    expect(validator.validate(params)).toBeTruthy();

    params = { name: 'Rafael', description: 'Some description' };
    expect(validator.validate(params)).toBeTruthy();

    params = { name: 'Rafael', description: '', is_active: true };
    expect(validator.validate(params)).toBeTruthy();

    params = { name: 'Any', is_active: true, created_at: new Date() };
    expect(validator.validate(params)).toBeTruthy();
  });
});
