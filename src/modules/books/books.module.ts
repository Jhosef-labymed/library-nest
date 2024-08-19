import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [SharedModule]
})
export class BooksModule {}
