import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { ImagesModule } from './images/images.module';
import { EffectsModule } from './effects/effects.module';

@Module({
  imports: [HealthCheckModule, ImagesModule, 
    // EffectsModule
  ],
})
export class ResourcesModule {}
