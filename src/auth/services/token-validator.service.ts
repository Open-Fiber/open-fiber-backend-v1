import { Injectable } from "@nestjs/common";
import { ITokenStrategy } from "./token-strategy";
import { IAuthToken } from "../interfaces/authToken.interface";

@Injectable()
export class TokenValidatorService {
  constructor(private readonly strategy: ITokenStrategy) {}

  validateToken(token: string): Promise<IAuthToken | false> {
    return this.strategy.validate(token);
  }
}
