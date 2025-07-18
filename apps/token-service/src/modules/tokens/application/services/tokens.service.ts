import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTokenCommand, CreateTokenDataType } from '../commands';
import { TokensEntity } from '../../domain';

@Injectable()
export class TokensService {
  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus
  ) {}

  async create(data: CreateTokenDataType): Promise<TokensEntity> {
    return await this.command.execute(new CreateTokenCommand(data));
  }
}
