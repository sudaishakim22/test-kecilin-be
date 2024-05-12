import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { Book, BookDocument } from './book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBookDto } from 'src/book/dto/create-book.dto';
import { UpdateBookDto } from 'src/book/dto/update-book.dto';

@Injectable()
export class BookRepository extends BaseRepository<Book> {
  constructor(@InjectModel(Book.name) model: Model<BookDocument>) {
    super(model);
  }

  async getItemCount() {
    return await this.model.countDocuments();
  }

  async findAll(query: any, sort: any, skip: any, limit: any) {
    return await this.model
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return await this.model.create(createBookDto);
  }

  async findById(id: string): Promise<Book> {
    return await this.model.findById(id);
  }

  async delete(id: string) {
    const objId = new Types.ObjectId(id);
    return await this.model.deleteOne({ _id: objId }).exec();
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const objId = new Types.ObjectId(id);
    return await this.model
      .findByIdAndUpdate({ _id: objId }, updateBookDto, { new: true })
      .exec();
  }
}
