import { Module } from '@nestjs/common';
import { ExceptionModule } from 'src/exception/exception.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { ImagesModule } from './images/images.module';
import { EffectsModule } from './effects/effects.module';

@Module({
  imports: [ExceptionModule, HealthCheckModule, ImagesModule, EffectsModule],
})
export class ResourcesModule {}
