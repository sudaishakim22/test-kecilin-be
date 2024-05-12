import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Types } from 'mongoose';
import { UpdateBookDto } from './dto/update-book.dto';
import { FindAllQueryDto } from './dto/find-all-query.dto';

@Controller('book')
@UseGuards(AuthGuard('jwt'))
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('all')
  async findAll(@Query() query: FindAllQueryDto) {
    const { page, limit, filter, sort, search } = query;
    const data = await this.bookService.findAll(
      page,
      limit,
      filter,
      sort,
      search,
    );

    return {
      message: 'Success Get All Books',
      data: data,
    };
  }

  @Post('create')
  async createBook(
    @Body()
    book: CreateBookDto,
    @Req() req: any,
  ) {
    const { role } = req.user;

    if (role != 'admin') {
      throw new UnauthorizedException('Cannot Access this endpoint!');
    }

    const data = await this.bookService.createBook(book);

    return {
      message: 'Success Create Book',
      data: data,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const data = await this.bookService.findById(id);

    return {
      message: 'Success Get Book',
      data: data,
    };
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string, @Req() req: any) {
    const { role } = req.user;

    if (role != 'admin') {
      throw new UnauthorizedException('Cannot Access this endpoint!');
    }

    const result = await this.bookService.deleteBook(id);

    return {
      message: 'Success Delete Book!',
      result: result,
    };
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Req() req: any,
  ) {
    const { role } = req.user;
    if (role != 'admin') {
      throw new UnauthorizedException('Cannot Access this endpoint!');
    }

    const result = await this.bookService.updateBook(id, updateBookDto);

    return {
      message: 'Update Book Success',
      data: result,
    };
  }
}
