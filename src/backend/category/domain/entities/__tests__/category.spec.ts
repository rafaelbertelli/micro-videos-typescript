import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { Category } from '../category';

describe('Category', () => {
  describe('Contructor', () => {
    it('should call validation', () => {
      Category.validate = jest.fn();

      const name = 'Giordano';
      const category = new Category({ name });

      expect(Category.validate).toHaveBeenCalled();
      expect(category.name).toEqual(name);
    });

    it('should create a category passing only name', () => {
      const name = 'Giordano';
      const category = new Category({ name });

      expect(category.id).not.toBeUndefined();
      expect(category.name).toEqual(name);
      expect(category.description).toBeUndefined();
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).not.toBeUndefined();
    });

    it('should create a category passing all params', () => {
      const uuid = uuidv4();
      const name = 'Giordano';
      const description = 'Sant`Angel';
      const is_active = true;
      const created_at = new Date();

      const category = new Category({
        id: uuid,
        name,
        description,
        is_active,
        created_at,
      });

      expect(category.id).toEqual(uuid);
      expect(category.name).toEqual(name);
      expect(category.description).toEqual(description);
      expect(category.is_active).toEqual(is_active);
      expect(category.created_at).toEqual(created_at);
    });

    it('should have a valid auto generated uuid', () => {
      const category = new Category({ name: 'Giordano' });
      const validatedId = uuidValidate(category.id);
      expect(validatedId).toBeTruthy();
    });

    it('should have a valid string uuid', () => {
      const id = '54982045-b970-4c4b-ad7c-3ac77e8f3c0a';
      const category = new Category({ id, name: 'Giordano' });
      const validatedId = uuidValidate(category.id);
      expect(validatedId).toBeTruthy();
    });
  });

  describe('Activate', () => {
    it('should activate a category', () => {
      const name = 'Giordano';
      const is_active = false;
      const category = new Category({ name, is_active });

      expect(category.is_active).toBeFalsy();
      category.activate();
      expect(category.is_active).toBeTruthy();
    });
  });

  describe('Deactivate', () => {
    it('should deactivate a category', () => {
      const name = 'Giordano';
      const is_active = true;
      const category = new Category({ name, is_active });

      expect(category.is_active).toBeTruthy();
      category.deactivate();
      expect(category.is_active).toBeFalsy();
    });
  });

  describe('Update', () => {
    it('should update name and keep description', () => {
      Category.validate = jest.fn();

      const name = 'Giordano';
      const description = 'some description';
      const category = new Category({ name, description });

      expect(category.name).toEqual(name);
      expect(category.description).toEqual(description);

      const updatedName = 'Rafael';
      category.update({ name: updatedName });

      expect(category.name).toEqual(updatedName);
      expect(category.description).toEqual(description);

      expect(Category.validate).toHaveBeenCalledTimes(2);
    });

    it('should clean description', () => {
      const name = 'Giordano';
      const description = 'some description';
      const category = new Category({ name, description });

      expect(category.name).toEqual(name);
      expect(category.description).toEqual(description);

      category.update({ name, description: '' });

      expect(category.name).toEqual(name);
      expect(category.description).toBeUndefined();
    });

    it('should not clean name', () => {
      const name = 'Giordano';
      const category = new Category({ name });

      expect(category.name).toEqual(name);
      category.update({ name: '' });
      expect(category.name).toEqual(name);
    });
  });
});
