import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImageProcessingCommands } from './commands';
import { ImageProcessingBuilders } from './builders';
import { ExceptionModule } from 'src/exception/exception.module';

@Module({
  imports: [ExceptionModule],
  controllers: [ImagesController],
  providers: [...ImageProcessingCommands, ...ImageProcessingBuilders],
})
export class ImagesModule {}
