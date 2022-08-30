import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResourcesModule } from './resources/resources.module';
import AppServiceConfig from '../config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { APPLICATION_CONFIG } from 'config/constants';
import { EventsModule } from './events/events.module';

const logger = new Logger();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppServiceConfig],
      envFilePath: ['./config/image-tools.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { mongoUri } = configService.get(`${APPLICATION_CONFIG}`);
        logger.debug(`connecting with Mongo URI: ${mongoUri}`);
        return {
          uri: mongoUri,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { mongoUri } = configService.get(`${APPLICATION_CONFIG}`);
        logger.debug(`connecting with Mongo URI: ${mongoUri}`);
        return {
          uri: mongoUri,
        };
      },
      inject: [ConfigService],
    }),
    ResourcesModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
