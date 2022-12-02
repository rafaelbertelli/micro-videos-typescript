import { ValidationError } from '../../../../@seedwork/errors/validation.error';
import { Category } from '../category';

describe('Category Validations', () => {
  describe('Property name', () => {
    it('should be required string with maxLength', () => {
      expect(() => new Category({ name: '' })).toThrow(
        new ValidationError('Property "name" is required'),
      );

      expect(() => new Category({ name: null })).toThrow(
        new ValidationError('Property "name" is required'),
      );

      expect(() => new Category({ name: undefined })).toThrow(
        new ValidationError('Property "name" is required'),
      );

      expect(() => new Category({ name: 123 as any })).toThrow(
        new ValidationError('Property "name" must be string'),
      );

      expect(() => new Category({ name: true as any })).toThrow(
        new ValidationError('Property "name" must be string'),
      );

      expect(() => new Category({ name: 'l'.repeat(100) })).toThrow(
        new ValidationError('Property "name" must be less than 99 chatacteres'),
      );

      expect(() => new Category({ name: 'l'.repeat(99) })).toThrow(
        new ValidationError('Property "name" must be less than 99 chatacteres'),
      );

      expect(() => new Category({ name: 'l'.repeat(98) })).not.toThrow(
        ValidationError,
      );
    });
  });

  describe('Property description', () => {
    it('should be string', () => {
      expect(
        () => new Category({ name: 'Michael', description: 123 as any }),
      ).toThrow(new ValidationError('Property "description" must be string'));

      expect(
        () => new Category({ name: 'Michael', description: true as any }),
      ).toThrow(new ValidationError('Property "description" must be string'));

      expect(
        () => new Category({ name: 'Michael', description: false as any }),
      ).toThrow(new ValidationError('Property "description" must be string'));

      expect(
        () =>
          new Category({ name: 'Michael', description: 'Some description' }),
      ).not.toThrow();
    });
  });

  describe('Property is_active', () => {
    it('should be string', () => {
      expect(
        () => new Category({ name: 'Michael', is_active: 123 as any }),
      ).toThrow(new ValidationError('Property "is_active" must be boolean'));

      expect(
        () =>
          new Category({
            name: 'Michael',
            is_active: 'Some description' as any,
          }),
      ).toThrow(new ValidationError('Property "is_active" must be boolean'));

      expect(
        () => new Category({ name: 'Michael', is_active: true }),
      ).not.toThrow(ValidationError);

      expect(
        () => new Category({ name: 'Michael', is_active: false }),
      ).not.toThrow(ValidationError);
    });
  });

  describe('Validate on method', () => {
    it('should validate on update', () => {
      const name = 'Giordano';
      const description = 'some description';
      const category = new Category({ name, description });

      expect(() => category.update({ name: '' })).toThrow(
        new ValidationError('Property "name" is required'),
      );

      expect(() =>
        category.update({ name, description: false as any }),
      ).toThrow(new ValidationError('Property "description" must be string'));
    });
  });
});
