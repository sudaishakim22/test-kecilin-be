import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/repository/book/book.schema';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(Category, {
    message: `Please enter correct category (${Object.values(Category)})`,
  })
  readonly category: Category;
}
