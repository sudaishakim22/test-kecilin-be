import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/repository/book';

export enum ESort {
  TITLE_ASC = 'title_asc',
  TITLE_DESC = 'title_desc',
}

export class FindAllQueryDto {
  @IsOptional()
  @IsNumber()
  public page?: number = 1;

  @IsOptional()
  @IsNumber()
  public limit?: number = 10;

  @IsOptional()
  @IsEnum(Category, {
    message: `Please enter correct category (${Object.values(Category)})`,
  })
  public filter?: string;

  @IsOptional()
  @IsEnum(ESort, {
    message: `Please enter correct sort (${Object.values(ESort)})`,
  })
  public sort?: string;

  @IsOptional()
  @IsString()
  public search?: string;
}
