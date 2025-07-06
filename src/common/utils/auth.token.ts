import * as jwt from 'jsonwebtoken';

import { IAuthTokenResult } from './../../auth/interfaces/auth.interface';
import { IAuthToken } from './../../auth/interfaces/authToken.interface';

export const authToken = (token: string): IAuthToken | string => {
  try {
    const decode = jwt.decode(token) as IAuthTokenResult;
    const currentDate = new Date();
    const expiresDate = new Date(decode.exp * 1000);

    const isExpired = +expiresDate <= +currentDate;
    const timeRemaining = Math.max(0, Math.floor((expiresDate.getTime() - currentDate.getTime()) / 1000));

    return {
      rol: decode.rol,
      tipo: decode.tipo,
      sub: decode.sub,
      time: timeRemaining,
      isExpired,
    };
  } catch (error) {
    return 'Token no valido.';
  }
};