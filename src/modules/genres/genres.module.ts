import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  providers: [GenresService],
  controllers: [GenresController],
  imports: [SharedModule]
})
export class GenresModule {}
