import { Module } from '@nestjs/common';
import { ImageProcessingBuilders } from 'src/resources/images/builders';
import { ImageProcessingCommands } from 'src/resources/images/commands';
import { ApplyFiltersCommand } from 'src/resources/images/commands/applyFilters.cmd';
import { ProcessImageCommand } from 'src/resources/images/commands/processImage.cmd';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway, ...ImageProcessingCommands, ...ImageProcessingBuilders]
})
export class EventsModule {}
