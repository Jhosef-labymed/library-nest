import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';

@Module({
  providers: [SharedService],
  controllers: [],
  exports: [SharedService]
})
export class SharedModule {}
