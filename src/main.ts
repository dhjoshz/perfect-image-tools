import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { APPLICATION_CONFIG } from '../config/constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import {
  ImageExceptionsInterceptor,
  RuntimeExceptionsInterceptor,
} from 'libs/commons-exceptions/src';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Image Tools')
  .setDescription('Image Tools service')
  .setVersion('1.0')
  .addTag('health-check', 'check the api status')
  .addTag('images', 'process the image with Sharp', {
    description: 'sharp library',
    url: 'https://sharp.pixelplumbing.com/',
  });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('perfect-image-tools');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    RuntimeExceptionsInterceptor.instance,
    ImageExceptionsInterceptor.instance,
  );
  const configService = app.get(ConfigService);
  const properties = configService.get(`${APPLICATION_CONFIG}`);
  const API_PORT = properties.port;
  const config = swaggerConfig.build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(API_PORT);
}
bootstrap();
