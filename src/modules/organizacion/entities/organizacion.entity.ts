import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { CuentaEntity } from "src/modules/cuenta/entities/cuenta.entity";

@Entity({ name: 'organizacion' })
export class OrganizacionEntity extends BaseEntity {

    @Column({ name: 'nombre', type: 'varchar', length: 120, nullable: false })
    nombre: string;

    @Column({ name: 'descripcion', type: 'varchar', nullable: false })
    descripcion: string;

    @Column({ name: 'direccion', type: 'varchar', nullable: false })
    direccion: string;

    @Column({ name: 'pais', type: 'varchar', length: 20, nullable: true })
    pais: string;

    @Column({ name: 'telefono', type: 'varchar', length: 20, nullable: true })
    telefono: string;

    @Column({ name: 'pagina_url', type: 'date', nullable: true })
    pagina_url?: Date;

    @Column({ name: 'foto_url', type: 'varchar', nullable: true })
    logo_url?: string;

    @OneToOne(() => CuentaEntity, { cascade: true })
    @JoinColumn()
    cuenta: CuentaEntity;
}