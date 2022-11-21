import { ERROR_MSG } from '../constants/messages.constants';

export class InvalidUuidError extends Error {
  constructor() {
    super(ERROR_MSG.UUID_INVALID);
    this.name = 'InvalidUuidError';
  }
}
