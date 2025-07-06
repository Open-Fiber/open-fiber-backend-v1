// src/modules/recurso/entities/recurso.entity.ts
import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { MaquinaEntity } from 'src/modules/maquina/entities/maquina.entity';

@Entity('recursos')
export class RecursoEntity extends BaseEntity {
  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ default: false })
  isDeleted: boolean;
}