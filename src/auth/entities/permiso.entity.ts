import { BaseEntity } from "./../../common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'permiso' })
export class PermisoEntity extends BaseEntity {

    @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false, unique: true })
    nombre: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    descripcion: string;

}
