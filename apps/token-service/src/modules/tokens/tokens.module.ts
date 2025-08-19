import { Module } from '@nestjs/common';
import { AppJwtService, TokensService } from './application/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensEntity } from './domain/tokens.entity';
import { CreateTokenHandler } from './application/commands';

const commands = [CreateTokenHandler];

const queries: never[] = [];

@Module({
  imports: [TypeOrmModule.forFeature([TokensEntity])],
  providers: [TokensService, AppJwtService, ...commands, ...queries],
  exports: [TokensService],
})
export class TokensModule {}
