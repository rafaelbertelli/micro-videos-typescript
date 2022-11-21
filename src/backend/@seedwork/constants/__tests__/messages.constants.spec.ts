import { ERROR_MSG } from '../messages.constants';

describe('Messages', () => {
  it('should validate messages', () => {
    expect(ERROR_MSG.UUID_INVALID).toEqual('Id must be a valid UUID');
  });
});
