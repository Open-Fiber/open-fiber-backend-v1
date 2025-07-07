// src/modules/hito/entities/hito.entity.ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './../../../common/entities/base.entity';
import { MaquinaEntity } from './../../../modules/maquina/entities/maquina.entity';

@Entity('hitos')
export class HitoEntity extends BaseEntity {
  @Column()
  descripcion: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => MaquinaEntity, maquina => maquina.hitos, { eager: true })
  maquina: MaquinaEntity;
}