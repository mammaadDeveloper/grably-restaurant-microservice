import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './infrastructure';
import { UsersEntity } from './domain/users.entity';
import {
  CreateUserHandler,
  DeleteUserHandler,
  UpdateUserHandler,
} from './application/commands';
import { FindAllUserHandler, FindUserByIdHandler, FindUserByPhoneHandler } from './application/queries';

const commands = [CreateUserHandler, UpdateUserHandler, DeleteUserHandler];

const queries = [FindAllUserHandler, FindUserByIdHandler, FindUserByPhoneHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  controllers: [UsersController],
  providers: [
    ...commands,
    ...queries,
    UsersService,
  ]
})
export class UsersModule {}
