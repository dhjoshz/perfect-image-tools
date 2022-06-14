import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { APPLICATION_CONFIG } from '../config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const properties = configService.get(`${APPLICATION_CONFIG}`);
  const port = properties.port;
  await app.listen(port);
}
bootstrap();
