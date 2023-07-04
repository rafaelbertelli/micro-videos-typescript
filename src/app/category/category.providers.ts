/* eslint-disable @typescript-eslint/no-namespace */
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

const REPOSITORY_IN_USE = 'CATEGORY_IN_MEMORY_REPOSITORY';

export namespace CATEGORY_PROVIDERS {
  export namespace REPOSITORIES {
    export const CATEGORY_IN_MEMORY_REPOSITORY = {
      provide: 'CategoryRepository',
      useClass: CategoryInMemoryRepository,
    };
  }

  export namespace USE_CASES {
    export const CREATE_CATEGORY_USECASE = {
      provide: CreateCategoryUsecase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new CreateCategoryUsecase(categoryRepository);
      },
      inject: [REPOSITORIES[REPOSITORY_IN_USE].provide],
    };

    export const FIND_ALL_CATEGORIES_USECASE = {
      provide: FindAllCategoriesUsecase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new FindAllCategoriesUsecase(categoryRepository);
      },
      inject: [REPOSITORIES[REPOSITORY_IN_USE].provide],
    };

    export const SEARCH_CATEGORIES_USECASE = {
      provide: SearchCategoriesUsecase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new SearchCategoriesUsecase(categoryRepository);
      },
      inject: [REPOSITORIES[REPOSITORY_IN_USE].provide],
    };

    export const FIND_BY_ID_CATEGORY_USECASE = {
      provide: FindByIdCategoryUsecase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new FindByIdCategoryUsecase(categoryRepository);
      },
      inject: [REPOSITORIES[REPOSITORY_IN_USE].provide],
    };

    export const UPDATE_CATEGORY_USECASE = {
      provide: UpdateCategoryUsecase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new UpdateCategoryUsecase(categoryRepository);
      },
      inject: [REPOSITORIES[REPOSITORY_IN_USE].provide],
    };

    export const DELETE_CATEGORY_USECASE = {
      provide: DeleteCategoryUsecase,
      useFactory: (categoryRepository: CategoryRepository.Repository) => {
        return new DeleteCategoryUsecase(categoryRepository);
      },
      inject: [REPOSITORIES[REPOSITORY_IN_USE].provide],
    };
  }
}
