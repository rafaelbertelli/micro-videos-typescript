import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateCategoryUsecase,
  FindAllCategoriesUsecase,
  FindByIdCategoryUsecase,
  UpdateCategoryUsecase,
} from '../../backend/category/application';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly _createCategoryUsecase: CreateCategoryUsecase,
    private readonly _findAllCategoriesUsecase: FindAllCategoriesUsecase,
    private readonly _findByIdCategoryUsecase: FindByIdCategoryUsecase,
    private readonly _updateCategoryUsecase: UpdateCategoryUsecase,
  ) {}

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

  @Patch(':id')
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.categoryService.remove(+id);
  }
}
