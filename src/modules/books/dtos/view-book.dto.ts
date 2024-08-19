import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MaxLength } from 'class-validator';

export class ViewBookDto {
  @ApiProperty()
  @Type(() => Number)
  bookId: number;
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
  @Type(() => String)
  genre: string;
  @ApiProperty()
  @Type(() => String)
  author: string;
}
