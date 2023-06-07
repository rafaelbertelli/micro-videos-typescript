import { FieldsErrors } from '../../../../backend/@seedwork/validator';
import { ERROR_MSG, ERROR_NAME } from '../../constants/error.constants';
import { InvalidUuidError } from '../invalid-uuid.error';
import { NotFoundError } from '../not-found.error';
import { EntityValidationError, ValidationError } from '../validation.error';

describe('Test Classes of Errors', () => {
  describe('InvalidUuidError', () => {
    it('should verify InvalidUuidError', () => {
      const error = new InvalidUuidError();

      expect(error.message).toBe(ERROR_MSG.INVALID_UUID);
      expect(error.name).toBe(ERROR_NAME.INVALID_UUID_ERROR);
    });
  });

  describe('ValidationError', () => {
    it('should verify ValidationError', () => {
      const error = new ValidationError();

      expect(error.message).toBe(ERROR_MSG.INVALID_PROPERTY);
      expect(error.name).toBe(ERROR_NAME.VALIDATION_ERROR);
    });

    it('should have a custom ValidationError message', () => {
      const error = new ValidationError('ERRRRRRRROU');

      expect(error.message).toBe('ERRRRRRRROU');
      expect(error.name).toBe(ERROR_NAME.VALIDATION_ERROR);
    });
  });

  describe('EntityValidationError', () => {
    it('should verify EntityValidationError', () => {
      const errorParams: FieldsErrors = { name: ['is required'] };
      const error = new EntityValidationError(errorParams);

      expect(error.message).toBe(ERROR_MSG.INVALID_ENTITY);
      expect(error.name).toBe(ERROR_NAME.ENTITY_VALIDATION_ERROR);
      expect(error.error).toStrictEqual(errorParams);
    });
  });

  describe('NotFoundError', () => {
    it('should verify NotFoundError', () => {
      const errorMessage = 'Entidade não encontrada!!!';
      let error = new NotFoundError(errorMessage);
      expect(error.message).toBe(errorMessage);
      expect(error.name).toBe(ERROR_NAME.NOT_FOUND_ERROR);

      error = new NotFoundError();
      expect(error.message).toBe(ERROR_MSG.NOT_FOUND_ENTITY);
      expect(error.name).toBe(ERROR_NAME.NOT_FOUND_ERROR);
    });
  });
});
