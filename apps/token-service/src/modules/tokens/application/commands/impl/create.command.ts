import { Command } from "@nestjs/cqrs";
import { TokensEntity } from "../../../domain/tokens.entity";
import { TokenStautsEnum } from '../../../domain/enums/tokens.enum';

export type CreateTokenDataType = {
  name?: string;
  user: string,
  token: string;
  ip: string;
  userAgent: string;
  status?: TokenStautsEnum;
};

export class CreateTokenCommand extends Command<TokensEntity>{
  constructor(
    public readonly data: CreateTokenDataType
  ){
    super();
  }
}
