import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  providers: [AuthorsService],
  controllers: [AuthorsController],
  imports: [SharedModule]
})
export class AuthorsModule {}
