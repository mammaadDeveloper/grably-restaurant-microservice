import { Module } from '@nestjs/common';
import { TokensService } from './infrastructure/tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensEntity } from './domain/tokens.entity';

const commands: never[] = [];

const queries: never[] = [];

@Module({
  imports: [TypeOrmModule.forFeature([TokensEntity])],
  providers: [...commands, ...queries, TokensService],
  exports: [TokensService],
})
export class TokensModule {}
