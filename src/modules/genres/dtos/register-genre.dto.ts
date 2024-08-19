import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RegisterGenreDto {
  @ApiProperty()
  @Type(() => String)
  code: string;
  @ApiProperty()
  @Type(() => String)
  genre: string;
}
