/* eslint-disable @typescript-eslint/no-unused-vars */
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllUserQuery } from "../impl/all.query";
import { UsersEntity } from "../../../domain/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@QueryHandler(FindAllUserQuery)
export class FindAllUserHandler implements IQueryHandler<FindAllUserQuery>{
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repo: Repository<UsersEntity>
  ){}
  async execute(query: FindAllUserQuery): Promise<UsersEntity[] | null> {
    return await this.repo.find();
  }
}
