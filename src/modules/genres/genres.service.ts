import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Genres } from 'src/entities/db/genres.entity';
import { DataSource } from 'typeorm';
import { SharedService } from '../shared/shared.service';
import { RegisterGenreDto } from './dtos/register-genre.dto';
import { ViewGenreDto } from './dtos/view-genre.dto';

@Injectable()
export class GenresService {
    private readonly logger = new Logger('GenresService');

    constructor(private readonly dataSource: DataSource, private _utilsService: SharedService) {}
  
    async create(dto: RegisterGenreDto) {
      try {
        await this.dataSource
          .createQueryBuilder()
          .insert()
          .into(Genres)
          .values({genre: dto.genre, code: dto.code , createdAt: this._utilsService.getDatetimeNow()})
          .execute();
  
        return {
          code: HttpStatus.OK,
          message: 'Genre created successfully',
        };
      } catch (error) {
        this.logger.error(error);
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            code: error.code,
            error: 'Unable to create genre',
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      }
    }
  
    async update(id: number, dto: RegisterGenreDto) {
      try {
        const genre = await this.dataSource
          .createQueryBuilder()
          .select('*')
          .from(Genres, 'a')
          .where('a.genreId = :id', { id })
          .getRawOne();
  
        if (!genre) throw new Error('Genre not found');
  
        await this.dataSource
          .createQueryBuilder()
          .insert()
          .update(Genres)
          .update(dto)
          .where('genreId = :id', { id })
          .execute();
  
        return {
          code: HttpStatus.OK,
          message: 'Genre updated successfully',
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
  
    async getById(id: number): Promise<ViewGenreDto> {
      try {
        const genreRaw = await this.dataSource
          .createQueryBuilder()
          .select('*')
          .from(Genres, 'g')
          .where('g.genreId = :id', { id })
          .getRawOne();
  
        if (!genreRaw) throw new Error('Genre not found');
  
        return { genre: genreRaw.genre, genreId: genreRaw.genreId, code: genreRaw.code };
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
  
    async getAll(): Promise<ViewGenreDto[]> {
      try {
        const genres = await this.dataSource
          .createQueryBuilder()
          .select('genreId, genre, code')
          .from(Genres, 'a')
          .getRawMany();
  
        return genres;
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
