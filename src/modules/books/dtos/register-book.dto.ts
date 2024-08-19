import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MaxLength } from 'class-validator';

export class RegisterBookDto {
  @ApiProperty()
  @Type(() => String)
  title: string;
  @ApiProperty()
  @Type(() => String)
  @MaxLength(50)
  isbn: string;
  @ApiProperty()
  @Type(() => Date)
  publicationDate: Date;
  @ApiProperty()
  @Type(() => Number)
  genreId: number;
  @ApiProperty()
  @Type(() => Number)
  authorId: number;
}
