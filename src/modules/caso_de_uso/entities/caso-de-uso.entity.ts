// src/modules/caso-de-uso/entities/caso-de-uso.entity.ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './../../../common/entities/base.entity';
import { MaquinaEntity } from './../../../modules/maquina/entities/maquina.entity';

@Entity('casos_de_uso')
export class CasoDeUsoEntity extends BaseEntity {
  @Column()
  descripcion: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => MaquinaEntity, maquina => maquina.casosDeUso, { eager: true })
  maquina: MaquinaEntity;
}