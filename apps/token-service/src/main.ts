import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration
  const config = app.get(ConfigService);

  // Run
  const port = config.get<number>('app.port', 3002);
  await app.listen(port);
  Logger.log(
    `🚀 Auth application is running on: http://0.0.0.0:${port}`
  );
}

bootstrap();
