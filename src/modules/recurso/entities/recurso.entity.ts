// src/modules/recurso/entities/recurso.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './../../../common/entities/base.entity';
@Entity('recursos')
export class RecursoEntity extends BaseEntity {
  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ default: false })
  isDeleted: boolean;
}