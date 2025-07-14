import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByIdQuery, FindUserByPhoneQuery } from '../impl/find.query';
import { UsersEntity } from '../../../domain/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repo: Repository<UsersEntity>
  ) {}
  async execute(query: FindUserByIdQuery): Promise<UsersEntity | null> {
    return await this.repo.findOne({ where: { id: query.id } });
  }
}

@QueryHandler(FindUserByPhoneQuery)
export class FindUserByPhoneHandler
  implements IQueryHandler<FindUserByPhoneQuery>
{
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repo: Repository<UsersEntity>
  ) {}
  async execute(query: FindUserByPhoneQuery): Promise<UsersEntity | null> {
    return await this.repo.findOne({ where: { phone: query.phone } });
  }
}
