// src/modules/compartido/entities/compartido.entity.ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { OrganizacionEntity } from 'src/modules/organizacion/entities/organizacion.entity'; // Importa OrganizacionEntity
import { MaquinaEntity } from 'src/modules/maquina/entities/maquina.entity'; // Importa MaquinaEntity

@Entity('compartidos')
export class CompartidoEntity extends BaseEntity {
  @Column({ type: 'char', length: 1, default: 'A' }) // A: Activo, I: Inactivo, P: Pendiente, etc.
  estado: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => OrganizacionEntity, { eager: true })
  organizacion: OrganizacionEntity; // El compartido pertenece a una organización

  @ManyToOne(() => MaquinaEntity, { eager: true })
  maquina: MaquinaEntity; // La máquina que está siendo compartida
}