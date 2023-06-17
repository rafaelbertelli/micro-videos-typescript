import { CategoryController } from './category.controller';
import {
  CreateCategoryInputDto,
  CreateCategoryOutputDto,
} from './dto/create-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    controller = new CategoryController();
  });

  it('should create a category', async () => {
    const output: CreateCategoryOutputDto = {
      id: '22d195cb-f0e7-4214-85f8-0abf10dcd143',
      name: 'Filme',
      description: 'Filmão',
      is_active: true,
      created_at: new Date(),
    };

    const mockUsecase = {
      execute: jest.fn().mockReturnValue(output),
    };

    controller['_createCategoryUsecase'] = mockUsecase as any;

    const input: CreateCategoryInputDto = {
      name: 'Filme',
      description: 'Filmão',
      is_active: true,
    };

    const result = await controller.create(input);

    expect(mockUsecase.execute).toHaveBeenCalledWith(input);
    expect(result).toStrictEqual(output);
  });

  it('should update a category', async () => {
    const id = '22d195cb-f0e7-4214-85f8-0abf10dcd143';

    const input: UpdateCategoryDto = {
      id,
      name: 'Filme',
      description: 'Filmão',
      is_active: true,
    };

    const output: UpdateCategoryDto = {
      id,
      name: 'Filme 2',
      description: 'Filmão Atualizado',
      is_active: true,
    };

    const mockUsecase = {
      execute: jest.fn().mockReturnValue(output),
    };

    controller['_updateCategoryUsecase'] = mockUsecase as any;

    const result = await controller.update(id, input);

    expect(mockUsecase.execute).toHaveBeenCalledWith(input);
    expect(result).toStrictEqual(output);
  });

  it('should remove a category', async () => {
    const id = '22d195cb-f0e7-4214-85f8-0abf10dcd143';

    const output = undefined;

    const mockUsecase = {
      execute: jest.fn().mockReturnValue(output),
    };

    controller['_deleteCategoryUsecase'] = mockUsecase as any;

    const result = await controller.remove(id);

    expect(controller.remove(id)).toBeInstanceOf(Promise);
    expect(mockUsecase.execute).toHaveBeenCalledWith({ id });
    expect(result).toStrictEqual(output);
  });

  it('should findOne item category', async () => {
    const id = '22d195cb-f0e7-4214-85f8-0abf10dcd143';

    const output: CreateCategoryOutputDto = {
      id,
      name: 'Filme 2',
      description: 'Filmão Atualizado',
      is_active: true,
      created_at: new Date(),
    };

    const mockUsecase = {
      execute: jest.fn().mockReturnValue(output),
    };

    controller['_findByIdCategoryUsecase'] = mockUsecase as any;

    const result = await controller.findOne(id);

    expect(controller.findOne(id)).toBeInstanceOf(Promise);
    expect(mockUsecase.execute).toHaveBeenCalledWith(id);
    expect(result).toStrictEqual(output);
  });

  it('should search item category', async () => {
    const id = '22d195cb-f0e7-4214-85f8-0abf10dcd143';

    const input: SearchCategoryDto = {
      page: 1,
      per_page: 10,
      sort: 'name',
      sort_dir: 'asc',
      filter: 'Filme',
    };

    const output: CreateCategoryOutputDto = {
      id,
      name: 'Filme 2',
      description: 'Filmão Atualizado',
      is_active: true,
      created_at: new Date(),
    };

    const mockUsecase = {
      execute: jest.fn().mockReturnValue(output),
    };

    controller['_searchCategoriesUsecase'] = mockUsecase as any;

    const result = await controller.search(input);

    expect(mockUsecase.execute).toHaveBeenCalledWith(input);
    expect(result).toStrictEqual(output);
  });
});
