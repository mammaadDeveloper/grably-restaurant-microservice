import { Controller } from "@nestjs/common";
import { AppJwtService, TokensService } from "../../application/services";
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class TokensGrpcController{
  constructor(
    private readonly tokenService: TokensService,
    private readonly jwtService: AppJwtService
  ){}

  @GrpcMethod('TokensService', 'CreateToken')
  async createToken(){
    return {
      token: ''
    };
  }

  @GrpcMethod('TokensService', 'VerifyToken')
  async verifyToken(){
    return {
      userId: ''
    };
  }

  @GrpcMethod('TokensService', 'RevokeToken')
  async revokeToken(){
    return {
      success: true
    }
  }
}
