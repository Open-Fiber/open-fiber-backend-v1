import { Column, Entity } from "typeorm";
import { Exclude } from "class-transformer";
import { BaseEntity } from "../../../common/entities/base.entity";
import { TIPO_CUENTA } from "../../../common/constants/tipoCuenta";

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
}
