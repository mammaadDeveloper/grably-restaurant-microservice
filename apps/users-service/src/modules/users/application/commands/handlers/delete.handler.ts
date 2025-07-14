import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../impl/delete.command';
import { DeleteResult } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersEntity } from '../../../domain/users.entity';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ) {}
  async execute(command: DeleteUserCommand): Promise<DeleteResult> {
    const { id } = command;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await this.dataSource.manager.delete(UsersEntity, id);

      await queryRunner.commitTransaction();

      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
