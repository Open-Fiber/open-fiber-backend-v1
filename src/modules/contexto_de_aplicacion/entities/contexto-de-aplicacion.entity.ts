// src/modules/contexto-de-aplicacion/entities/contexto-de-aplicacion.entity.ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './../../../common/entities/base.entity';
import { MaquinaEntity } from './../../../modules/maquina/entities/maquina.entity';

@Entity('contextos_de_aplicacion')
export class ContextoDeAplicacionEntity extends BaseEntity {
  @Column()
  descripcion: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => MaquinaEntity, maquina => maquina.contextosDeAplicacion, { eager: true })
  maquina: MaquinaEntity;
}