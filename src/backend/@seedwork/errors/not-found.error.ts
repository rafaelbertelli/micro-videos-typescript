import { ERROR_MSG, ERROR_NAME } from '../constants/error.constants';

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? ERROR_MSG.NOT_FOUND_ENTITY);
    this.name = ERROR_NAME.NOT_FOUND_ERROR;
  }
}
