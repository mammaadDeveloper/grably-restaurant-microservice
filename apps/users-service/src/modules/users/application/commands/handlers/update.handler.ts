import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../impl/update.command';
import { UpdateResult } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { UsersEntity } from '../../../domain/users.entity';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ) {}
  async execute(command: UpdateUserCommand): Promise<UpdateResult> {
    const { id, data } = command;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await this.dataSource.manager.update(
        UsersEntity,
        id,
        data
      );

      await queryRunner.commitTransaction();
      Logger.log('User updated successfully.');

      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      Logger.error('Failed to update user.', err);

      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
