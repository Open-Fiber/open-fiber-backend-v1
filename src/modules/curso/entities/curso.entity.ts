// src/modules/curso/entities/curso.entity.ts
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { CuentaEntity } from 'src/modules/cuenta/entities/cuenta.entity'; // Asegúrate de tener esta entidad
import { ClaseEntity } from 'src/modules/clase/entities/clase.entity';

@Entity('cursos')
export class CursoEntity extends BaseEntity {
  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  duracion: string; // Ej: '10 horas', '4 semanas', 'Autogestionado'

  @Column()
  nivel: string; // Ej: 'Básico', 'Intermedio', 'Avanzado'

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => CuentaEntity, cuenta => cuenta.cursos, { eager: true })
  creador: CuentaEntity;

  @OneToMany(() => ClaseEntity, clase => clase.curso)
  clases: ClaseEntity[];
}