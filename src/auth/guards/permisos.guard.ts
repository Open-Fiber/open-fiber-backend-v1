import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { PERMISOS } from '../constants/permisos.constant';
import { PERMISOS_KEY } from '../decorators/permiso.decorator';
import { PermisoRolService } from '../services/permission-role.service';
import { IAuthToken } from '../interfaces/authToken.interface';
import { authToken } from '../../common/utils/auth.token';
import { RolService } from '../services/rol.service';

@Injectable()
export class PermisoGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        private readonly rolService: RolService,
        private readonly permisoRolService: PermisoRolService,
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        try {
            const permissionRequire = this.reflector.get<Array<PERMISOS>>(PERMISOS_KEY, context.getHandler());
            const request = context.switchToHttp().getRequest<Request>();
            const token = request.headers.authorization?.split(' ')[1];
            if (!token || Array.isArray(token))
                    throw new UnauthorizedException('Token no encontrado');
            const managerToken: IAuthToken | string = authToken(token);
            // const rol = managerToken.
            const rol =  await this.rolService.findOneByName((managerToken as IAuthToken).rol!);
            // console.log(rol);
            if (permissionRequire === undefined || permissionRequire.length == 0) return true;
            const permissionsUser = await this.permisoRolService.getPermisosOfRol(rol.id);
            const permissionArrayName = permissionsUser.map((permission) => permission.permiso.nombre);

            let isAuthorized = false;
            permissionArrayName.forEach(permiso => { if (permissionRequire.includes(permiso as PERMISOS)) return isAuthorized = true; });
            if (!isAuthorized) throw new UnauthorizedException('No tienes permisos para acceder a esta ruta.',);

            return true;
        } catch (error) {
            if (error instanceof UnauthorizedException) throw error;
            throw new InternalServerErrorException('Error al validar los permisos');
        }
    }
}
