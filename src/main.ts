import { NestFactory } from '@nestjs/core';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
