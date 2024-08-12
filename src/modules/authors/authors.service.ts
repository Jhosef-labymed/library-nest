import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RegisterAuthorDto } from './dtos/register-author.dto';
import { Authors } from 'src/entities/db/authors.entity';
import { ViewAuthorDto } from './dtos/view-author.dto';

@Injectable()
export class AuthorsService {
  private readonly logger = new Logger('AuthorService');

  constructor(private readonly dataSource: DataSource) {}

  async create(dto: RegisterAuthorDto) {
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Authors)
        .values(dto)
        .execute();

      return {
        code: HttpStatus.OK,
        message: 'Author created successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          code: error.code,
          error: 'Unable to create author',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async update(id: number, dto: RegisterAuthorDto) {
    try {
      const author = await this.dataSource
        .createQueryBuilder()
        .select('*')
        .from(Authors, 'a')
        .where('a.authorId = :id', { id })
        .getRawOne();

      if (!author) throw new Error('Author not found');

      await this.dataSource
        .createQueryBuilder()
        .insert()
        .update(Authors)
        .update(dto)
        .where('authorId = :id', { id })
        .execute();

      return {
        code: HttpStatus.OK,
        message: 'Author updated successfully',
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

  async getById(id: number): Promise<ViewAuthorDto> {
    try {
      const author = await this.dataSource
        .createQueryBuilder()
        .select('*')
        .from(Authors, 'a')
        .where('a.authorId = :id', { id })
        .getRawOne();

      if (!author) throw new Error('Author not found');

      return { author: author.author, authorId: author.authorId };
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

  async getAll(): Promise<ViewAuthorDto[]> {
    try {
      const authors = await this.dataSource
        .createQueryBuilder()
        .select('authorId, author')
        .from(Authors, 'a')
        .getRawMany();

      return authors;
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
