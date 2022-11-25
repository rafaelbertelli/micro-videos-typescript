import { ERROR_MSG } from '../constants/error.constants';

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message ?? ERROR_MSG.INVALID_PROPERTY);
    this.name = 'ValidationError';
  }
}
