import { ValidationError } from '../../errors/validation.error';
import { ValidatorRules } from '../validator-rules';

describe('Validator Rules', () => {
  describe('static values method', () => {
    it('should receive value and property as parameters', () => {
      const validator = ValidatorRules.values('Rafael', 'name');
      expect(validator).toBeInstanceOf(ValidatorRules);
      expect(validator['value']).toBe('Rafael');
      expect(validator['property']).toBe('name');
    });
  });

  describe('required', () => {
    describe('should be required - error cases', () => {
      const ERROR_PROPERTY = 'name';
      const ERROR_MESSAGE = `Property "name" is required`;
      const ARRANGE_ERROR = [
        { value: '', property: ERROR_PROPERTY, message: ERROR_MESSAGE },
        { value: null, property: ERROR_PROPERTY, message: ERROR_MESSAGE },
        { value: undefined, property: ERROR_PROPERTY, message: ERROR_MESSAGE },
      ];

      test.each(ARRANGE_ERROR)('%j', ({ value, property, message }) => {
        expect(() => ValidatorRules.values(value, property).required()).toThrow(
          new ValidationError(message),
        );
      });
    });

    describe('should be required - success cases', () => {
      const SUCCESS_PROPERTY = 'name';
      const ARRANGE_SUCCESS = [
        { value: 'Rafael', property: SUCCESS_PROPERTY },
        { value: { name: 'Rafael' }, property: SUCCESS_PROPERTY },
        { value: [], property: SUCCESS_PROPERTY },
        { value: [1, 2], property: SUCCESS_PROPERTY },
      ];

      test.each(ARRANGE_SUCCESS)('%j', ({ value, property }) => {
        expect(() =>
          ValidatorRules.values(value, property).required(),
        ).not.toThrow();
      });
    });
  });

  describe('string', () => {
    describe('should be string - error cases', () => {
      const ERROR_PROPERTY = 'name';
      const ERROR_MESSAGE = `Property "name" must be string`;
      const ARRANGE_ERROR = [
        { value: 1, property: ERROR_PROPERTY, message: ERROR_MESSAGE },
        { value: false, property: ERROR_PROPERTY, message: ERROR_MESSAGE },
      ];

      test.each(ARRANGE_ERROR)('%j', ({ value, property, message }) => {
        expect(() => ValidatorRules.values(value, property).string()).toThrow(
          new ValidationError(message),
        );
      });
    });

    describe('should be required string - error cases', () => {
      const ERROR_PROPERTY = 'name';
      const ERROR_MESSAGE = `Property "name" is required`;
      const ARRANGE_ERROR = [
        { value: null, property: ERROR_PROPERTY, message: ERROR_MESSAGE },
        { value: undefined, property: ERROR_PROPERTY, message: ERROR_MESSAGE },
      ];

      test.each(ARRANGE_ERROR)('%j', ({ value, property, message }) => {
        expect(() =>
          ValidatorRules.values(value, property).required().string(),
        ).toThrow(new ValidationError(message));
      });
    });

    describe('should be string - success cases', () => {
      const SUCCESS_PROPERTY = 'name';
      const ARRANGE_SUCCESS = [
        { value: 'Rafael', property: SUCCESS_PROPERTY },
        { value: '132', property: SUCCESS_PROPERTY },
        { value: '', property: SUCCESS_PROPERTY },
        { value: null, property: SUCCESS_PROPERTY },
      ];

      test.each(ARRANGE_SUCCESS)('%j', ({ value, property }) => {
        expect(() =>
          ValidatorRules.values(value, property).string(),
        ).not.toThrow();
      });
    });
  });

  describe('maxLength', () => {
    describe('should validate maxLength - error cases', () => {
      const ERROR_PROPERTY = 'name';
      const ERROR_MESSAGE = `Property "name" must be less than 5 chatacteres`;
      const ARRANGE_ERROR = [
        { value: 'abacaxi', property: ERROR_PROPERTY, message: ERROR_MESSAGE },
        { value: 'civic', property: ERROR_PROPERTY, message: ERROR_MESSAGE },
      ];

      test.each(ARRANGE_ERROR)('%j', ({ value, property, message }) => {
        expect(() =>
          ValidatorRules.values(value, property).maxLength(5),
        ).toThrow(new ValidationError(message));
      });
    });

    describe('should validate maxLength - success cases', () => {
      const SUCCESS_PROPERTY = 'name';
      const ARRANGE_SUCCESS = [{ value: 'Rafael', property: SUCCESS_PROPERTY }];

      test.each(ARRANGE_SUCCESS)('%j', ({ value, property }) => {
        expect(() =>
          ValidatorRules.values(value, property).maxLength(7),
        ).not.toThrow();
      });
    });
  });

  describe('boolean', () => {
    describe('should validate boolean - error cases', () => {
      const ERROR_PROPERTY = 'name';
      const ERROR_MESSAGE = `Property "name" must be boolean`;
      const ARRANGE_ERROR = [
        { value: 'abacaxi', property: ERROR_PROPERTY, message: ERROR_MESSAGE },
        { value: 123, property: ERROR_PROPERTY, message: ERROR_MESSAGE },
        { value: [1, 2], property: ERROR_PROPERTY, message: ERROR_MESSAGE },
        { value: {}, property: ERROR_PROPERTY, message: ERROR_MESSAGE },
      ];

      test.each(ARRANGE_ERROR)('%j', ({ value, property, message }) => {
        expect(() => ValidatorRules.values(value, property).boolean()).toThrow(
          new ValidationError(message),
        );
      });
    });

    describe('should validate boolean - success cases', () => {
      const SUCCESS_PROPERTY = 'name';
      const ARRANGE_SUCCESS = [
        { value: true, property: SUCCESS_PROPERTY },
        { value: false, property: SUCCESS_PROPERTY },
      ];

      test.each(ARRANGE_SUCCESS)('%j', ({ value, property }) => {
        expect(() =>
          ValidatorRules.values(value, property).boolean(),
        ).not.toThrow();
      });
    });
  });

  it('should test all success cases', () => {
    expect.assertions(0);

    ValidatorRules.values('', 'prop').string();
    ValidatorRules.values('abc', 'prop').string();
    ValidatorRules.values('abc', 'prop').required().string();
    ValidatorRules.values('abc', 'prop').string().required();

    ValidatorRules.values(false, 'prop').boolean();
    ValidatorRules.values(true, 'prop').boolean();
    ValidatorRules.values(false, 'prop').required().boolean();
    ValidatorRules.values(true, 'prop').boolean().required();

    ValidatorRules.values('abcd', 'prop').maxLength(5).required();
    ValidatorRules.values('abcd', 'prop').required().maxLength(5);
    ValidatorRules.values('abcd', 'prop').maxLength(5);
  });
});
