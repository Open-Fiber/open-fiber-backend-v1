import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { PERMISOS } from '../constants/permisos.constant';
import { PERMISOS_KEY } from '../decorators/permiso.decorator';
import { PermisoRolService } from '../services/permission-role.service';

@Injectable()
export class PermisoGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        private readonly permisoRolService: PermisoRolService,
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        try {

            const permissionRequire = this.reflector.get<Array<PERMISOS>>(PERMISOS_KEY, context.getHandler());
            const request = context.switchToHttp().getRequest<Request>();
            if (permissionRequire === undefined || permissionRequire.length == 0) return true;

            const { rolId } = (request as any);
            const permissionsUser = await this.permisoRolService.getPermisosOfRol(rolId);
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
