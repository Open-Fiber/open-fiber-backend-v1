import { SetMetadata } from '@nestjs/common';

export const PERMISOS_KEY = 'permiso';
export const PermisoAccess = (...permisos: string[]) =>
  SetMetadata(PERMISOS_KEY, permisos);
