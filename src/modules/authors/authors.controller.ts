import { Body, Controller, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { RegisterAuthorDto } from './dtos/register-author.dto';

@Controller('authors')
export class AuthorsController {

    constructor(private _service: AuthorsService){}

    @Post()
    async create(@Body() dto: RegisterAuthorDto){
        return await this._service.create(dto);
    }

}
