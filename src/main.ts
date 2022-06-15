import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { APPLICATION_CONFIG } from '../config/constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const properties = configService.get(`${APPLICATION_CONFIG}`);
  const API_PORT = properties.port;
  const config = new DocumentBuilder()
    .setTitle('Image Tools')
    .setDescription('Image Tools service')
    .setVersion('1.0')
    .addTag('health-check')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(API_PORT);
}
bootstrap();
