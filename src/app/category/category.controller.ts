import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateCategoryUsecase,
  DeleteCategoryUsecase,
  FindAllCategoriesUsecase,
  FindByIdCategoryUsecase,
  SearchCategoriesUsecase,
  UpdateCategoryUsecase,
} from '../../backend/category/application';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  @Inject(CreateCategoryUsecase)
  private readonly _createCategoryUsecase: CreateCategoryUsecase;

  @Inject(FindAllCategoriesUsecase)
  private readonly _findAllCategoriesUsecase: FindAllCategoriesUsecase;

  @Inject(SearchCategoriesUsecase)
  private readonly _searchCategoriesUsecase: SearchCategoriesUsecase;

  @Inject(FindByIdCategoryUsecase)
  private readonly _findByIdCategoryUsecase: FindByIdCategoryUsecase;

  @Inject(UpdateCategoryUsecase)
  private readonly _updateCategoryUsecase: UpdateCategoryUsecase;

  @Inject(DeleteCategoryUsecase)
  private readonly _deleteCategoryUsecase: DeleteCategoryUsecase;

  // constructor(
  //   private readonly _createCategoryUsecase: CreateCategoryUsecase,
  //   private readonly _findAllCategoriesUsecase: FindAllCategoriesUsecase,
  //   private readonly _findByIdCategoryUsecase: FindByIdCategoryUsecase,
  //   private readonly _updateCategoryUsecase: UpdateCategoryUsecase,
  // ) {}

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const result = await this._createCategoryUsecase.execute(
        createCategoryDto,
      );
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
          data: error.error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Search results',
  })
  @HttpCode(200)
  @Post('/search')
  async search(@Body() searchCategoryDto: SearchCategoryDto) {
    try {
      const result = await this._searchCategoriesUsecase.execute(
        searchCategoryDto,
      );
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
          data: error.error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this._findAllCategoriesUsecase.execute();
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
          data: error.error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this._findByIdCategoryUsecase.execute(id);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
          data: error.error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const result = await this._updateCategoryUsecase.execute({
        id,
        ...updateCategoryDto,
      });
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
          data: error.error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this._deleteCategoryUsecase.execute({ id });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
          data: error.error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
