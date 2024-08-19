import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiParam, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegisterGenreDto } from './dtos/register-genre.dto';
import { ViewGenreDto } from './dtos/view-genre.dto';
import { GenresService } from './genres.service';

@ApiTags("Genres")
@Controller('genres')
export class GenresController {
    constructor(private _service: GenresService) {}

  @Post()
  async create(@Body() dto: RegisterGenreDto) {
    return await this._service.create(dto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the genre',
    schema: { type: 'integer' },
  })
  async update(@Param('id') id: number, @Body() dto: RegisterGenreDto) {
    return await this._service.update(id, dto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the genre',
    schema: { type: 'integer' },
  })
  @ApiOkResponse({
    description: 'Get the genre by id',
    type: ViewGenreDto,
    isArray: false,
  })
  async getById(@Param('id') id: number) {
    return await this._service.getById(id);
  }


  @Get()
  @ApiOkResponse({
    description: 'Get the genres',
    type: ViewGenreDto,
    isArray: true,
  })
  async getAll() {
    return await this._service.getAll();
  }

}
