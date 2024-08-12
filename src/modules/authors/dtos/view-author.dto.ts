import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ViewAuthorDto {
  @ApiProperty()
  @Type(() => Number)
  authorId: number;
  @ApiProperty()
  @Type(() => String)
  author: string;
}
