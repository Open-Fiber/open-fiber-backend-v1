import { Injectable, Logger } from '@nestjs/common';
import { PermisoService } from './../auth/services/permiso.service';
import { CreatePermisoDTO } from './../auth/dto/create-permiso.dto';
import { handlerError } from '../common/utils/handlerError.utils';

@Injectable()
export class PermisoSeeder {
  private readonly logger = new Logger('PermisoSeeder');

  constructor(private readonly permisoService: PermisoService) {}

  async run() {
    const permisos: CreatePermisoDTO[] = [
      { nombre: 'user.create', descripcion: 'Crear usuario' },
      { nombre: 'user.update', descripcion: 'Actualizar usuario' },
      { nombre: 'user.delete', descripcion: 'Eliminar usuario' },
      { nombre: 'user.read', descripcion: 'Ver usuario' },
      { nombre: 'user.read.all', descripcion: 'Ver todos los usuarios' },
      { nombre: 'organizacion.create', descripcion: 'Crear organización' },
      { nombre: 'organizacion.update', descripcion: 'Actualizar organización' },
      { nombre: 'organizacion.delete', descripcion: 'Eliminar organización' },
      { nombre: 'organizacion.read', descripcion: 'Ver organización' },
      { nombre: 'organizacion.read.all', descripcion: 'Ver todas las organizaciones' },
      { nombre: 'rol.create', descripcion: 'Crear rol' },
      { nombre: 'rol.update', descripcion: 'Actualizar rol' },
      { nombre: 'rol.delete', descripcion: 'Eliminar rol' },
      { nombre: 'rol.read', descripcion: 'Ver rol' },
      { nombre: 'rol.read.all', descripcion: 'Ver todos los roles' },
      { nombre: 'permiso.create', descripcion: 'Crear permiso' },
      { nombre: 'permiso.update', descripcion: 'Actualizar permiso' },
      { nombre: 'permiso.delete', descripcion: 'Eliminar permiso' },
      { nombre: 'permiso.read', descripcion: 'Ver permiso' },
      { nombre: 'permiso.read.all', descripcion: 'Ver todos los permisos' },
    ];

    try {
      for (const permiso of permisos) {
        await this.permisoService.create(permiso);
      }

      this.logger.log('Permisos sembrados correctamente');
    } catch (error) {
      handlerError(error, this.logger);
    }
  }
}
