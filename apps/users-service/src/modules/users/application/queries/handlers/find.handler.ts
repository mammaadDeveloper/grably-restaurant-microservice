import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindUserByIdQuery, FindUserByPhoneQuery } from "../impl/find.query";
import { UsersRepository } from "../../../infrastructure";
import { UsersEntity } from "../../../domain/users.entity";

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery>{
  constructor(private readonly repo: UsersRepository){}
  async execute(query: FindUserByIdQuery): Promise<UsersEntity | null> {
    return await this.repo.find(query.id);
  }
}

@QueryHandler(FindUserByPhoneQuery)
export class FindUserByPhoneHandler implements IQueryHandler<FindUserByPhoneQuery>{
  constructor(private readonly repo: UsersRepository){}
  async execute(query: FindUserByPhoneQuery): Promise<UsersEntity | null> {
    return await this.repo.findByPhone(query.phone);
  }
}
