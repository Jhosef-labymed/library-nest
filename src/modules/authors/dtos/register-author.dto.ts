import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RegisterAuthorDto {
  @ApiProperty()
  @Type(() => String)
  author: string;
}
