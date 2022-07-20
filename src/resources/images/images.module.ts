import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImageProcessingCommands } from './commands';
import { ImageProcessingBuilders } from './builders';

@Module({
  imports: [],
  controllers: [ImagesController],
  providers: [...ImageProcessingCommands, ...ImageProcessingBuilders],
})
export class ImagesModule {}
