import { Injectable } from "@nestjs/common";
import { JwtPayload, JwtProvidorInterface } from "../../domain";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AppJwtService implements JwtProvidorInterface{
  constructor(private readonly jwt: JwtService,
    private readonly config: ConfigService
  ){}
  async sign(payload: JwtPayload): Promise<string> {
    return this.jwt.sign(payload, {
      secret: this.config.get('jwt.secret'),
      expiresIn: '15m'
    });
  }
  async verify(token: string): Promise<JwtPayload> {
    return this.jwt.verify(token, {secret: this.config.get('jwt.secret')});
  }
}
