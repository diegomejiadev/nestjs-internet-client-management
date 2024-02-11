import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './core/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* Setting global prefix
  app.setGlobalPrefix('/api');

  //* Setting global validation for DTO
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  //* Setting global serialization
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //* Setting global filter exception
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
