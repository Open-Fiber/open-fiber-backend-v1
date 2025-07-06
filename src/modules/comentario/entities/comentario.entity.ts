// src/modules/comentario/entities/comentario.entity.ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './../../../common/entities/base.entity';
import { CuentaEntity } from './../../../modules/cuenta/entities/cuenta.entity'; // Asegúrate de importar CuentaEntity
import { ClaseEntity } from './../../../modules/clase/entities/clase.entity'; // Asegúrate de importar ClaseEntity

@Entity('comentarios')
export class ComentarioEntity extends BaseEntity {
  @Column()
  mensaje: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => CuentaEntity, { eager: true })
  cuenta: CuentaEntity; // El comentario es hecho por una cuenta

  @ManyToOne(() => ClaseEntity, { eager: true })
  clase: ClaseEntity; // El comentario pertenece a una clase
}