import { ERROR_MSG } from '../error.constants';

describe('Messages', () => {
  it('should validate messages', () => {
    expect(ERROR_MSG.INVALID_UUID).toEqual('Id must be a valid UUID');
    expect(ERROR_MSG.INVALID_PROPERTY).toEqual('Invalid Property');
  });
});
