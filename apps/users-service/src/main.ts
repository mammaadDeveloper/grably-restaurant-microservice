import 'reflect-metadata';

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration
  const config = app.get(ConfigService);

  // Configuration port
  const port = config.get<number>('app.port', 3001);

  // Microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'users',
      protoPath: join(__dirname, '../../../libs/shared/src/protos/users.proto'),
      url: '0.0.0.0:50051'
    }
  });
  await app.startAllMicroservices();

  // Run
  await app.listen(port);
  Logger.log(
    `🚀 Users application is running on: http://0.0.0.0:${port}`
  );
}

bootstrap();
