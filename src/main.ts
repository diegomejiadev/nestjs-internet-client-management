import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* Setting global prefix
  app.setGlobalPrefix('/api');

  //* Setting global validation for DTO
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  //* Setting global serialization
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
}
bootstrap();
