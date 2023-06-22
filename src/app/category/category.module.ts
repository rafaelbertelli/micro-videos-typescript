import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CATEGORY_PROVIDERS } from './category.providers';

@Module({
  controllers: [CategoryController],
  providers: [
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES),
  ],
  // providers: [
  //   {
  //     provide: 'CategoryRepository',
  //     useClass: CategoryInMemoryRepository,
  //   },
  //   {
  //     provide: CreateCategoryUsecase,
  //     useFactory: (categoryRepository: CategoryRepository.Repository) => {
  //       return new CreateCategoryUsecase(categoryRepository);
  //     },
  //     inject: ['CategoryRepository'],
  //   },
  //   {
  //     provide: FindAllCategoriesUsecase,
  //     useFactory: (categoryRepository: CategoryRepository.Repository) => {
  //       return new FindAllCategoriesUsecase(categoryRepository);
  //     },
  //     inject: ['CategoryRepository'],
  //   },
  //   {
  //     provide: SearchCategoriesUsecase,
  //     useFactory: (categoryRepository: CategoryRepository.Repository) => {
  //       return new SearchCategoriesUsecase(categoryRepository);
  //     },
  //     inject: ['CategoryRepository'],
  //   },
  //   {
  //     provide: FindByIdCategoryUsecase,
  //     useFactory: (categoryRepository: CategoryRepository.Repository) => {
  //       return new FindByIdCategoryUsecase(categoryRepository);
  //     },
  //     inject: ['CategoryRepository'],
  //   },
  //   {
  //     provide: UpdateCategoryUsecase,
  //     useFactory: (categoryRepository: CategoryRepository.Repository) => {
  //       return new UpdateCategoryUsecase(categoryRepository);
  //     },
  //     inject: ['CategoryRepository'],
  //   },
  //   {
  //     provide: DeleteCategoryUsecase,
  //     useFactory: (categoryRepository: CategoryRepository.Repository) => {
  //       return new DeleteCategoryUsecase(categoryRepository);
  //     },
  //     inject: ['CategoryRepository'],
  //   },
  // ],
})
export class CategoryModule {}
