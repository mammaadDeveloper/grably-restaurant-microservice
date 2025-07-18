import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTokenCommand } from "../impl/create.command";
import { TokensEntity } from "../../../domain/tokens.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler implements ICommandHandler<CreateTokenCommand>{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ){}
  async execute(command: CreateTokenCommand): Promise<TokensEntity> {
    const {name, user, token, ip, userAgent, status}= command.data;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
      const tokenEntity = queryRunner.manager.create(TokensEntity, {name, token, ip, userAgent, user, status});
      await queryRunner.manager.save(tokenEntity);

      await queryRunner.commitTransaction();

      return tokenEntity;
    }
    catch(err){
      await queryRunner.rollbackTransaction();
      throw err;
    }
    finally{
      await queryRunner.release();
    }
  }
}
