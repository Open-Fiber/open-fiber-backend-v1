import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { RolEntity } from './rol.entity';
import { PermisoEntity } from './permiso.entity';

@Entity({ name: 'permiso_rol' })
export class PermisoRolEntity extends BaseEntity {

    @ManyToOne(() => PermisoEntity, permiso => "")
    permiso: PermisoEntity;

    @ManyToOne(() => RolEntity, rol => rol.permisos)
    rol: RolEntity;
}