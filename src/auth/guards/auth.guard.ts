import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { CuentaService } from '../../modules/cuenta/services/cuenta.service';
import { authToken } from '../../common/utils/auth.token';
import { IAuthToken } from '../interfaces/authToken.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly cuentaService: CuentaService,
    private readonly reflector: Reflector,
  ) { }
  async canActivate(context: ExecutionContext) {
    try {
      const request: any = context.switchToHttp().getRequest<Request>();
      const token = request.headers.authorization?.split(' ')[1];
      if (!token || Array.isArray(token))
        throw new UnauthorizedException('Token no encontrado');
      const managerToken: IAuthToken | string = authToken(token);
      if (typeof managerToken === 'string')
        throw new UnauthorizedException(managerToken);
      if (managerToken.isExpired)
        throw new UnauthorizedException('Token expirado');
      const cuenta = await this.cuentaService.findOneAuth(managerToken.sub);
      request.idCuenta = cuenta.id;
      request.tipoCuenta = cuenta.tipo;
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error al validar el token');
    }
  }
}
