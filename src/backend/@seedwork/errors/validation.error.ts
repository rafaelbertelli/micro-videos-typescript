import { ERROR_MSG, ERROR_NAME } from '../constants/error.constants';
import { FieldsErrors } from '../validator/validator-fields-interface';

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message ?? ERROR_MSG.INVALID_PROPERTY);
    this.name = 'ValidationError';
  }
}

export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors) {
    super(ERROR_MSG.INVALID_ENTITY);
    this.name = ERROR_NAME.ENTITY_VALIDATION_ERROR;
  }
}
