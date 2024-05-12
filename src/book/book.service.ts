import { Injectable } from '@nestjs/common';
import { Book, BookDocument, BookRepository } from 'src/repository/book';
import { CreateBookDto } from './dto/create-book.dto';
import { Types } from 'mongoose';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginatedDto } from './dto/paginated.dto';

@Injectable()
export class BookService {
  constructor(protected readonly bookRepository: BookRepository) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: string,
    sort: string,
    search: string,
  ) {
    const skip = (page - 1) * limit;
    const sortQuery = {};
    const query = {};

    if (filter) {
      query['category'] = filter;
    }

    if (search) {
      query['title'] = { $regex: search, $options: 'i' };
    }

    if (sort) {
      if (sort == 'title_asc') {
        sortQuery['title'] = 1;
      }
      if (sort == 'title_desc') {
        sortQuery['title'] = -1;
      }
    }

    const books = await this.bookRepository.findAll(
      query,
      sortQuery,
      skip,
      limit,
    );

    const itemCount = await this.bookRepository.getItemCount();

    return new PaginatedDto<any>(
      books.map(this.convert),
      page,
      limit,
      itemCount,
    );
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookRepository.create(createBookDto);
  }

  async findById(id: string) {
    return await this.bookRepository.findById(id);
  }

  async deleteBook(id: string) {
    return await this.bookRepository.delete(id);
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    return await this.bookRepository.update(id, updateBookDto);
  }

  private convert(book: BookDocument): any {
    const json = book.toObject({ versionKey: false });
    const id = json._id;
    delete json._id;
    return {
      id: String(id),
      ...json,
    };
  }
}
