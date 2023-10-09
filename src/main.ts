import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger, runtime } from '@/common/runtime';
import { createSwagger } from '@/common/swagger';
import { resTransformInterceptor } from './Interceptor/res.transform.interceptor';
import { HttpExceptionFilterClass } from './filter/http.exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { address, port } = runtime();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new resTransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilterClass());
  // app.useGlobalGuards(new AuthGuard());
  app.enableCors();
  app.setGlobalPrefix('api');
  createSwagger(app);
  await app.listen(port, () => {
    logger(address, port);
  });
}
bootstrap();
