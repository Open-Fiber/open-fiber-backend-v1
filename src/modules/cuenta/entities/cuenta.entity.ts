import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { BaseEntity } from "./../../../common/entities/base.entity";
import { TIPO_CUENTA } from "./../../../common/constants/tipoCuenta";
import { ProyectoEntity } from "./../../../modules/proyecto/entities/proyecto.entity";
import { CursoEntity } from "src/modules/curso/entities/curso.entity";

@Entity({ name: 'cuenta' })
export class CuentaEntity extends BaseEntity {

    @Column({ name: 'email', type: 'varchar', length: 100, nullable: false, unique: true })
    email: string;

    @Column({ name: 'password', type: 'varchar', nullable: false })
    @Exclude()
    password: string;

    @Column({ name: 'tipo', type: 'enum', enum: TIPO_CUENTA, default: TIPO_CUENTA.USER })
    tipo: TIPO_CUENTA;

    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;

    @Column({ name: 'is_deleted', type: 'boolean', default: false })
    isDeleted: boolean;

    @OneToMany(() => ProyectoEntity, proyecto => proyecto.cuenta)
    proyectos: ProyectoEntity[];

    @OneToMany(() => CursoEntity, curso => curso.creador)
    cursos: CursoEntity[];
}
