import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiParam, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { RegisterBookDto } from './dtos/register-book.dto';
import { ViewBookDto } from './dtos/view-book.dto';

@ApiTags("Books")
@Controller('books')
export class BooksController {
    constructor(private _service: BooksService) {}

    @Post()
    async create(@Body() dto: RegisterBookDto) {
      return await this._service.create(dto);
    }
  
    @Put(':id')
    @ApiParam({
      name: 'id',
      required: true,
      description: 'id of the book',
      schema: { type: 'integer' },
    })
    async update(@Param('id') id: number, @Body() dto: RegisterBookDto) {
      return await this._service.update(id, dto);
    }
  
    @Get(':id')
    @ApiParam({
      name: 'id',
      required: true,
      description: 'id of the book',
      schema: { type: 'integer' },
    })
    @ApiOkResponse({
      description: 'Get the book by id',
      type: ViewBookDto,
      isArray: false,
    })
    async getById(@Param('id') id: number) {
      return await this._service.getById(id);
    }
  
  
    @Get()
    @ApiOkResponse({
      description: 'Get the books',
      type: ViewBookDto,
      isArray: true,
    })
    async getAll() {
      return await this._service.getAll();
    }
  
}
