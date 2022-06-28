import { Module } from '@nestjs/common';
import { ExceptionModule } from 'src/exception/exception.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [ExceptionModule, HealthCheckModule, ImagesModule],
})
export class ResourcesModule {}
