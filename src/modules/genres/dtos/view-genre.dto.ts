import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ViewGenreDto {
  @ApiProperty()
  @Type(() => Number)
  genreId: number;
  @ApiProperty()
  @Type(() => String)
  code: string;
  @ApiProperty()
  @Type(() => String)
  genre: string;
}
