import { ValidationError } from '../../errors/validation.error';
import { ValidatorRules } from '../validator-rules';

describe('Validator Rules', () => {
  it('should work', () => {
    const validator = ValidatorRules.values('Rafael', 'name').required();
    console.log(validator);
  });

  describe('required', () => {
    it('should be required', () => {
      const validator = ValidatorRules.values('Rafael', 'name').required();
      console.log(validator);

      expect(() => ValidatorRules.values('', 'name').required()).toThrow(
        ValidationError,
      );
    });
  });
});
