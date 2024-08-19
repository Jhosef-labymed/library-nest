import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Books } from 'src/entities/db/books.entity';
import { DataSource } from 'typeorm';
import { SharedService } from '../shared/shared.service';
import { RegisterBookDto } from './dtos/register-book.dto';
import { ViewBookDto } from './dtos/view-book.dto';
import { Genres } from 'src/entities/db/genres.entity';
import { Authors } from 'src/entities/db/authors.entity';

@Injectable()
export class BooksService {
    private readonly logger = new Logger('BookService');

  constructor(private readonly dataSource: DataSource, private _utilsService: SharedService) {}

  async create(dto: RegisterBookDto) {
    try {

        console.log(dto)

      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Books)
        .values({ authorId: dto.authorId, borrowed: false, isbn: dto.isbn, publicationDate: dto.publicationDate, title : dto.title , genreId: dto.genreId , createdAt: this._utilsService.getDatetimeNow()})
        .execute();

      return {
        code: HttpStatus.OK,
        message: 'Book created successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          code: error.code,
          error: 'Unable to create book',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async update(id: number, dto: RegisterBookDto) {
    try {
      const book = await this.dataSource
        .createQueryBuilder()
        .select('*')
        .from(Books, 'a')
        .where('a.bookId = :id', { id })
        .getRawOne();

      if (!book) throw new Error('Book not found');

      await this.dataSource
        .createQueryBuilder()
        .insert()
        .update(Books)
        .update(dto)
        .where('bookId = :id', { id })
        .execute();

      return {
        code: HttpStatus.OK,
        message: 'Book updated successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          code: error.code,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async getById(id: number): Promise<ViewBookDto> {
    try {
      const book = await this.dataSource
        .createQueryBuilder()
        .select(['b.*', 'g.genre as genre', 'a.author as author'])
        .from(Books, 'b')
        .innerJoin(Genres, 'g' , 'b.genreId = g.genreId')
        .innerJoin(Authors, 'a', 'b.authorId = a.authorId')
        .where('b.bookId = :id', { id })
        .getRawOne();

      if (!book) throw new Error('Book not found');

      return { author: book.author, bookId: book.bookId, genre: book.genre, isbn: book.isbn, publicationDate: book.publicationDate, title : book.title };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          code: error.code,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async getAll(): Promise<ViewBookDto[]> {
    try {
      const books = await this.dataSource
        .createQueryBuilder()
        .select(['b.bookId as bookId', 'b.title as title', 'b.isbn as isbn', 'b.publicationDate as publicationDate', 'b.borrowed as borrowed', 'g.genre as genre', 'a.author as author'])
        .from(Books, 'b')
        .innerJoin(Genres, 'g' , 'b.genreId = g.genreId')
        .innerJoin(Authors, 'a', 'b.authorId = a.authorId')
        .getRawMany();

      return books;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          code: error.code,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }
}
