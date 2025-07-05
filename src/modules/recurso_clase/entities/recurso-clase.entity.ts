// src/modules/recurso-clase/entities/recurso-clase.entity.ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { ClaseEntity } from 'src/modules/clase/entities/clase.entity'; // Asegúrate de importar ClaseEntity

@Entity('recursos_clase')
export class RecursoClaseEntity extends BaseEntity {
  @Column({ name: 'nombre_recurso' })
  nombreRecurso: string;

  @Column({ name: 'recurso_url' })
  recursoUrl: string; // URL al archivo o recurso

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => ClaseEntity, clase => clase.recursosClase, { eager: true })
  clase: ClaseEntity; // El recurso de clase pertenece a una clase
}