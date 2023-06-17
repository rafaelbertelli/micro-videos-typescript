export class CreateCategoryInputDto {
  name: string;
  description?: string;
  is_active?: boolean;
}

export class CreateCategoryOutputDto {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
  created_at: Date;
}
