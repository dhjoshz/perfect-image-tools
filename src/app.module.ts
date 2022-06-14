import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ResourcesModule } from './resources/resources.module';
import AppServiceConfig from '../config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppServiceConfig],
      envFilePath: ['./config/image-tools.env'],
    }),
    ResourcesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
