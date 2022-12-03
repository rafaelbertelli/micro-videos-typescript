import { ClassValidatorFields } from '../class-validator-fields';
import * as libClassValidator from 'class-validator';

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string;
}> {}

describe('ClassValidatorFields', () => {
  it('should initialize errors and validatedFields as null', () => {
    const validator = new StubClassValidatorFields();
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toBeNull();
  });

  it('should validate with errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'Required error' } },
    ]);

    const validator = new StubClassValidatorFields();

    expect(validator.validate(null)).toBeFalsy();
    expect(validator.validatedData).toBeNull();
    expect(validator.errors).toStrictEqual({
      field: ['Required error'],
    });
    expect(spyValidateSync).toHaveBeenCalled();
  });

  it('should validate without errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([]);

    const validator = new StubClassValidatorFields();

    expect(validator.validate({ field: 'value' })).toBeTruthy();
    expect(validator.validatedData).toStrictEqual({ field: 'value' });
    expect(validator.errors).toBeNull();
    expect(spyValidateSync).toHaveBeenCalled();
  });
});
