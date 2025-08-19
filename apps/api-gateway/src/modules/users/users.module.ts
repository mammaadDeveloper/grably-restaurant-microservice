import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [ClientsModule.registerAsync([{
    name: 'USERS_PACKAGE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      transport: Transport.GRPC,
      options: {
        package: configService.get<string>('users.package', 'users'),
        url: configService.get<string>('users.url', 'localhost:50051'),
        protoPath: join(__dirname, '..', '..', '..', '..', '..', 'libs', 'shared', 'protos', 'src', 'users.proto')
      }
    })
  }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
