import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RegisterAuthorDto } from './dtos/register-author.dto';
import { Authors } from 'src/entities/db/authors.entity';

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
}
