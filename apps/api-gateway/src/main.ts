import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration
  const config = app.get(ConfigService);

  // Get the port from the configuration, defaulting to 3000 if not set
  const port = config.get<number>('app.port', 3000);

  // Set global prefix for the API routes
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Enable CORS
  app.enableCors();

  // Run the application
  await app.listen(port);
  Logger.log(`🚀 Gateway Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
