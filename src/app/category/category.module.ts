import { Module } from '@nestjs/common';
import {
  CreateCategoryUsecase,
  DeleteCategoryUsecase,
  FindAllCategoriesUsecase,
  FindByIdCategoryUsecase,
  SearchCategoriesUsecase,
  UpdateCategoryUsecase,
} from '../../backend/category/application';
import { CategoryRepository } from '../../backend/category/domain';
import { CategoryInMemoryRepository } from '../../backend/category/infra';
import { CategoryController } from './category.controller';

@Module({
  controllers: [CategoryController],
  providers: [
    {
      provide: 'CategoryRepository',
      useClass: CategoryInMemoryRepository,
    },
    {
      provide: CreateCategoryUsecase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new CreateCategoryUsecase(categoryRepository);
      },
      inject: ['CategoryRepository'],
    },
    {
      provide: FindAllCategoriesUsecase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new FindAllCategoriesUsecase(categoryRepository);
      },
      inject: ['CategoryRepository'],
    },
    {
      provide: SearchCategoriesUsecase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new SearchCategoriesUsecase(categoryRepository);
      },
      inject: ['CategoryRepository'],
    },
    {
      provide: FindByIdCategoryUsecase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new FindByIdCategoryUsecase(categoryRepository);
      },
      inject: ['CategoryRepository'],
    },
    {
      provide: UpdateCategoryUsecase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new UpdateCategoryUsecase(categoryRepository);
      },
      inject: ['CategoryRepository'],
    },
    {
      provide: DeleteCategoryUsecase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new DeleteCategoryUsecase(categoryRepository);
      },
      inject: ['CategoryRepository'],
    },
  ],
})
export class CategoryModule {}
