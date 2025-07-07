// src/modules/like/entities/like.entity.ts
import { Entity, ManyToOne, Column } from 'typeorm';
import { BaseEntity } from './../../../common/entities/base.entity';
import { MaquinaEntity } from './../../../modules/maquina/entities/maquina.entity';
import { CuentaEntity } from './../../../modules/cuenta/entities/cuenta.entity'; // Asegúrate de tener esta entidad

@Entity('likes')
export class LikeEntity extends BaseEntity {

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => MaquinaEntity, maquina => maquina.likes, { eager: true })
  maquina: MaquinaEntity;

  @ManyToOne(() => CuentaEntity, { eager: true })
  cuenta: CuentaEntity;
}