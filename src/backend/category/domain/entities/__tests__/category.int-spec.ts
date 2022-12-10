import { ERROR_NAME } from '../../../../@seedwork/constants/error.constants';
import { EntityValidationError } from '../../../../@seedwork/errors/validation.error';
import { Category, CategoryProps } from '../category';

describe('Category Validations', () => {
  test('Category validations should be working ', () => {
    const props: CategoryProps = { name: '' };
    expect(() => new Category(props)).toThrow(EntityValidationError);

    try {
      new Category(props);
    } catch (error) {
      expect(error.name).toBe(ERROR_NAME.ENTITY_VALIDATION_ERROR);
      expect(error.error).toStrictEqual({ name: ['name should not be empty'] });
    }
  });

  test('Category should be validated', () => {
    const created_at = new Date();
    const props: CategoryProps = {
      name: 'Rafael',
      description: 'Some descriptions',
      is_active: true,
      created_at,
    };

    expect(() => new Category(props)).not.toThrow();
  });

  describe('Property name', () => {
    it('should validate error cases', () => {
      let props: CategoryProps;

      try {
        props = { name: '' };
        new Category(props);
      } catch (error) {
        expect(error.error).toStrictEqual({
          name: ['name should not be empty'],
        });
      }

      try {
        props = { name: null };
        new Category(props);
      } catch (error) {
        expect(error.error).toStrictEqual({
          name: [
            'name should not be empty',
            'name must be a string',
            'name must be shorter than or equal to 99 characters',
          ],
        });
      }

      try {
        props = { name: undefined };
        new Category(props);
      } catch (error) {
        expect(error.error).toStrictEqual({
          name: [
            'name should not be empty',
            'name must be a string',
            'name must be shorter than or equal to 99 characters',
          ],
        });
      }

      try {
        props = { name: 'r'.repeat(100) };
        new Category(props);
      } catch (error) {
        expect(error.error).toStrictEqual({
          name: ['name must be shorter than or equal to 99 characters'],
        });
      }

      try {
        props = { name: 123 as any };
        new Category(props);
      } catch (error) {
        expect(error.error).toStrictEqual({
          name: [
            'name must be a string',
            'name must be shorter than or equal to 99 characters',
          ],
        });
      }
    });
  });
});
