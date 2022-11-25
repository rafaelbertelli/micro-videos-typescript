import { ERROR_MSG, ERROR_NAME } from '../constants/error.constants';

export class InvalidUuidError extends Error {
  constructor() {
    super(ERROR_MSG.INVALID_UUID);
    this.name = ERROR_NAME.INVALID_UUID_ERROR;
  }
}
