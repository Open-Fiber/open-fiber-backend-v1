import { Injectable } from '@nestjs/common';
import { ITokenStrategy } from '../token-strategy';
import { authToken } from '../../../common/utils/auth.token';
import { IAuthToken } from '../../interfaces/authToken.interface';

@Injectable()
export class JwtStrategy implements ITokenStrategy {
  async validate(token: string): Promise<IAuthToken | false> {
    const result = authToken(token);
    if (typeof result === 'string' || result.isExpired) return false;
    return result;
  }
}
