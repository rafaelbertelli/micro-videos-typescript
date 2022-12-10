import { Entity } from '../domain/entity/entity';
import { NotFoundError } from '../errors/not-found.error';
import { RepositoryInterface } from './repository-contracts';

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string): Promise<E> {
    const result = this.items.find((item) => item.id === id);

    if (!result) {
      throw new NotFoundError(`Entity ID: ${id} not found`);
    }

    return result;
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    const register = await this.findById(entity.id);
    const index = this.items.findIndex((item) => item.id === register.id);
    this.items[index] = entity;
  }

  async delete(id: string): Promise<void> {
    const register = await this.findById(id);
    const index = this.items.findIndex((item) => item.id === register.id);
    this.items.splice(index, 1);
  }
}
