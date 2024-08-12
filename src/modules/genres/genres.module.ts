import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [GenresService],
  controllers: [GenresController]
})
export class GenresModule {}
