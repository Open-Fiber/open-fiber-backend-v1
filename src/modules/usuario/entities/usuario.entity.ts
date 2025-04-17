import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { CuentaEntity } from "src/modules/cuenta/entities/cuenta.entity";
import { GENERO } from "src/common/constants/genero";

@Entity({ name: 'usuario' })
export class UsuarioEntity extends BaseEntity {

    @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
    nombre: string;

    @Column({ name: 'apellido', type: 'varchar', length: 100, nullable: false })
    apellido: string;

    @Column({ name: 'pais', type: 'varchar', length: 100, nullable: false })
    pais: string;

    @Column({ name: 'sexo', type: 'enum', enum: GENERO, nullable: false })
    sexo: GENERO;

    @Column({ name: 'fecha_nacimiento', type: 'date', nullable: true })
    fechaNacimiento: Date;

    @Column({ name: 'celular', type: 'varchar', length: 20, nullable: true })
    celular?: string;

    @Column({ name: 'foto_url', type: 'varchar', nullable: true })
    fotoUrl?: string;

    @OneToOne(() => CuentaEntity, { cascade: true })
    @JoinColumn()
    cuenta: CuentaEntity;

    // @Column({
    //     name: 'rol',
    //     type: 'enum',
    //     enum: ROLES,
    //     default: ROLES.BASIC
    // })
    // rol: ROLES;
}
