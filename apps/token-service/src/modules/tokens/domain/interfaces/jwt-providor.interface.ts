import { JwtPayload } from "../value-objects/jwt-payload.vo";

export interface JwtProvidorInterface{
  sign(payload: JwtPayload): Promise<string>;
  verify(token: string): Promise<JwtPayload>;
}
