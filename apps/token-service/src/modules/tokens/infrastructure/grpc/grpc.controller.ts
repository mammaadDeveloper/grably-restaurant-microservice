import { Controller } from "@nestjs/common";
import { AppJwtService, TokensService } from "../../application/services";
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { CreateTokenDto, VerifyTokenDto } from '../../domain/value-objects';

@Controller()
export class TokensGrpcController{
  constructor(
    private readonly tokenService: TokensService,
    private readonly jwtService: AppJwtService
  ){}

  @GrpcMethod('TokensService', 'CreateToken')
  async createToken(data: CreateTokenDto, metadata: Metadata){
    const ip = metadata.get('x-fowarded-for')?.[0] as string || '';
    const userAgent = metadata.get('user-agent')?.[0] as string || '';

    const signedToken = await this.jwtService.sign({sub: data.userId});
    await this.tokenService.create({name: data.name, user: data.userId, token: signedToken, ip, userAgent});

    return {
      token: signedToken
    };
  }

  @GrpcMethod('TokensService', 'VerifyToken')
  async verifyToken(data: VerifyTokenDto){
    const payload = await this.jwtService.verify(data.token);

    return {
      userId: payload.sub
    };
  }

  @GrpcMethod('TokensService', 'RevokeToken')
  async revokeToken(){
    return {
      success: true
    }
  }
}
