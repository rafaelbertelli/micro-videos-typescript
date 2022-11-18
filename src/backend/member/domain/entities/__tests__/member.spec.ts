import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { Member } from '../member';

describe('Member', () => {
  describe('Contructor', () => {
    it('should create a member passing only name', () => {
      const name = 'Giordano';
      const member = new Member({ name });

      expect(member.id).not.toBeUndefined();
      expect(member.name).toEqual(name);
      expect(member.description).toBeUndefined();
      expect(member.is_active).toBeFalsy();
      expect(member.created_at).not.toBeUndefined();
    });

    it('should create a member passing all params', () => {
      const uuid = uuidv4();
      const name = 'Giordano';
      const description = 'Sant`Angel';
      const is_active = true;
      const created_at = new Date();

      const member = new Member({
        id: uuid,
        name,
        description,
        is_active,
        created_at,
      });

      expect(member.id).toEqual(uuid);
      expect(member.name).toEqual(name);
      expect(member.description).toEqual(description);
      expect(member.is_active).toEqual(is_active);
      expect(member.created_at).toEqual(created_at);
    });

    it('should have a valid auto generated uuid', () => {
      const member = new Member({ name: 'Giordano' });
      const validatedId = uuidValidate(member.id);
      expect(validatedId).toBeTruthy();
    });

    it('should have a valid string uuid', () => {
      const id = '54982045-b970-4c4b-ad7c-3ac77e8f3c0a';
      const member = new Member({ id, name: 'Giordano' });
      const validatedId = uuidValidate(member.id);
      expect(validatedId).toBeTruthy();
    });
  });

  describe('Activate', () => {
    it('should activate a member', () => {
      const name = 'Giordano';
      const is_active = false;
      const member = new Member({ name, is_active });

      expect(member.is_active).toBeFalsy();
      member.activate();
      expect(member.is_active).toBeTruthy();
    });
  });

  describe('Deactivate', () => {
    it('should deactivate a member', () => {
      const name = 'Giordano';
      const is_active = true;
      const member = new Member({ name, is_active });

      expect(member.is_active).toBeTruthy();
      member.deactivate();
      expect(member.is_active).toBeFalsy();
    });
  });

  describe('Update', () => {
    it('should update name and keep description', () => {
      const name = 'Giordano';
      const description = 'some description';
      const member = new Member({ name, description });

      expect(member.name).toEqual(name);
      expect(member.description).toEqual(description);

      const updatedName = 'Rafael';
      member.update({ name: updatedName });

      expect(member.name).toEqual(updatedName);
      expect(member.description).toEqual(description);
    });

    it('should clean description', () => {
      const name = 'Giordano';
      const description = 'some description';
      const member = new Member({ name, description });

      expect(member.name).toEqual(name);
      expect(member.description).toEqual(description);

      member.update({ name, description: '' });

      expect(member.name).toEqual(name);
      expect(member.description).toBeUndefined();
    });

    it('should not clean name', () => {
      const name = 'Giordano';
      const member = new Member({ name });

      expect(member.name).toEqual(name);
      member.update({ name: '' });
      expect(member.name).toEqual(name);
    });
  });
});
