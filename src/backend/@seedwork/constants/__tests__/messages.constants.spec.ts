import { ERROR_MSG, ERROR_NAME } from '../error.constants';

describe('Messages', () => {
  it('should validate ERROR_MSG', () => {
    expect(ERROR_MSG.INVALID_UUID).toEqual('Id must be a valid UUID');
    expect(ERROR_MSG.INVALID_PROPERTY).toEqual('Invalid Property');
    expect(ERROR_MSG.INVALID_ENTITY).toEqual('Invalid Entity');
    expect(ERROR_MSG.NOT_FOUND_ENTITY).toEqual('Not Found Entity');
  });

  it('should validate ERROR_NAME', () => {
    expect(ERROR_NAME.INVALID_UUID_ERROR).toEqual('InvalidUuidError');
    expect(ERROR_NAME.VALIDATION_ERROR).toEqual('ValidationError');
    expect(ERROR_NAME.ENTITY_VALIDATION_ERROR).toEqual('EntityValidationError');
    expect(ERROR_NAME.NOT_FOUND_ERROR).toEqual('NotFoundError');
  });
});
