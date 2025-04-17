import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { CORS_OPTIONS } from './common/constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  app.setGlobalPrefix('api');
  
  app.enableCors(CORS_OPTIONS);

  app.useGlobalPipes(
    new ValidationPipe({
        transformOptions: {
        enableImplicitConversion: true,
      }
    })
  )

  const reflector = app.get('Reflector');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const title: string = configService.get('APP_NAME');
  const version: string = configService.get('APP_VERSION');
  const url = configService.get('APP_URL');
  
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(title)
    .setDescription('OpenFiber, plataforma de publicación y divulgación de proyectos y máquinas Maker.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  console.log(`Application is running on: ${url}`);
  
}
bootstrap();
