// src/modules/tecnologia/entities/tecnologia.entity.ts
import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { MaquinaEntity } from 'src/modules/maquina/entities/maquina.entity';

@Entity('tecnologias')
export class TecnologiaEntity extends BaseEntity {
  @Column()
  nombre: string;

  @Column()
  tipo: string; // Ej: 'Software', 'Hardware', 'Protocolo', 'Framework'

  @Column()
  descripcion: string;

  @Column({ default: false })
  isDeleted: boolean;
}