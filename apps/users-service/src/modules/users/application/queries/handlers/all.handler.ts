/* eslint-disable @typescript-eslint/no-unused-vars */
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllUserQuery } from "../impl/all.query";
import { UsersEntity } from "../../../domain/users.entity";
import { UsersRepository } from "../../../infrastructure";

@QueryHandler(FindAllUserQuery)
export class FindAllUserHandler implements IQueryHandler<FindAllUserQuery>{
  constructor(
    private readonly repo: UsersRepository
  ){}
  async execute(query: FindAllUserQuery): Promise<UsersEntity[] | null> {
    return await this.repo.findAll();
  }
}
