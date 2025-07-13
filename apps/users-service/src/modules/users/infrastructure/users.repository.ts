import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';

import { UsersEntity } from '../domain/users.entity';
import { CreateUserDto } from '../dto/create.dto';
import { UpdateUserDto } from '../dto/update.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repo: Repository<UsersEntity>
  ) {}

  async findAll(): Promise<UsersEntity[] | null> {
    return await this.repo.find();
  }

  async find(id: string): Promise<UsersEntity | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async findByPhone(phone: string): Promise<UsersEntity | null> {
    return await this.repo.findOne({ where: { phone } });
  }

  create(data: CreateUserDto): UsersEntity[] | UsersEntity {
    return this.repo.create(data);
  }

  async save(
    user: UsersEntity | UsersEntity[]
  ): Promise<UsersEntity | UsersEntity[]> {
    if (Array.isArray(user)) {
      return await this.repo.save(user as UsersEntity[]);
    } else {
      return await this.repo.save(user as UsersEntity);
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<UpdateResult> {
    return await this.repo.update({ id }, data);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repo.delete({ id });
  }
}
