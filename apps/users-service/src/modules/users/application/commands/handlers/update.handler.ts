import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "../impl/update.command";
import { UpdateResult } from "typeorm";
import { UsersEntity } from "../../../domain/users.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm/browser";
import { UsersRepository } from "../../../infrastructure";
import { Logger } from "@nestjs/common";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand>{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly repo: UsersRepository
  ){}
  async execute(command: UpdateUserCommand): Promise<UpdateResult> {
    const {id, data} = command;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
      const result = await this.repo.update(id, data);

      await queryRunner.commitTransaction();
      Logger.log('User updated successfully.');

      return result;
    }
    catch(err){
      await queryRunner.rollbackTransaction();

      Logger.error('Failed to update user.', err);

      throw err;
    }
    finally{
      await queryRunner.release();
    }
  }
}
