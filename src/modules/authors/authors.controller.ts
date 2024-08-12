import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { RegisterAuthorDto } from './dtos/register-author.dto';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ViewAuthorDto } from './dtos/view-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private _service: AuthorsService) {}

  @Post()
  async create(@Body() dto: RegisterAuthorDto) {
    return await this._service.create(dto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the author',
    schema: { type: 'integer' },
  })
  async update(@Param('id') id: number, @Body() dto: RegisterAuthorDto) {
    return await this._service.update(id, dto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the author',
    schema: { type: 'integer' },
  })
  @ApiOkResponse({
    description: 'Get the author by id',
    type: ViewAuthorDto,
    isArray: false,
  })
  async getById(@Param('id') id: number) {
    return await this._service.getById(id);
  }


  @Get()
  @ApiOkResponse({
    description: 'Get the authors',
    type: ViewAuthorDto,
    isArray: true,
  })
  async getAll() {
    return await this._service.getAll();
  }


}
