import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppServiceConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppServiceConfig],
      envFilePath: ['./config/image-tools.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
