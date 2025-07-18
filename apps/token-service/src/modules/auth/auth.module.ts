import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [TokensModule],
  controllers: [AuthController]
})
export class AuthModule {}
