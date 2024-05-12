import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepositoryModule } from 'src/repository/book';

@Module({
  imports: [BookRepositoryModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
