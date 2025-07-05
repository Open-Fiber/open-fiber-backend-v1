import { BaseEntity } from "../../common/entities/base.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { PermisoRolEntity } from "./permiso-rol.entity";
import { UsuarioEntity } from "src/modules/usuario/entities/usuario.entity";

@Entity({ name: 'rol' })
export class RolEntity extends BaseEntity {

    @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false, unique: true })
    nombre: string;

    @OneToMany(() => PermisoRolEntity, permisoRol => permisoRol.rol)
    permisos: PermisoRolEntity[];

    @OneToMany(() => UsuarioEntity, rol => rol.rol)
    usuarios: UsuarioEntity[];
}
