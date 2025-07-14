import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create.command';
import { UsersEntity } from '../../../domain/users.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ) {}
  async execute(
    command: CreateUserCommand
  ): Promise<UsersEntity | UsersEntity[]> {
    const { data } = command;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = this.dataSource.manager.create(UsersEntity, data);
      await this.dataSource.manager.save(user);

      await queryRunner.commitTransaction();
      Logger.log('User created successfully.');

      return user;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      Logger.error('Failed to create user.', err);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
