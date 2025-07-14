/* eslint-disable no-useless-catch */
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UsersEntity } from '../domain/users.entity';
import { FindAllUserQuery, FindUserByIdQuery } from '../application/queries';
import { CreateUserDto } from '../dto/create.dto';
import {
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
} from '../application/commands';
import { UpdateUserDto } from '../dto/update.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus
  ) {}

  async findAll(): Promise<UsersEntity[] | null> {
    return await this.query.execute(new FindAllUserQuery());
  }

  async find(id: string) {
    return await this.query.execute(new FindUserByIdQuery(id));
  }

  async create(data: CreateUserDto): Promise<UsersEntity | UsersEntity[]> {
    try {
      return await this.command.execute(new CreateUserCommand(data));
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<UpdateResult> {
    try {
      return await this.command.execute(new UpdateUserCommand(id, data));
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      return await this.command.execute(new DeleteUserCommand(id));
    } catch (err) {
      throw err;
    }
  }
}
