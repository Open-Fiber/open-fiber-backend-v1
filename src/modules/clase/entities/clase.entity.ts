// src/modules/clase/entities/clase.entity.ts
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { CursoEntity } from 'src/modules/curso/entities/curso.entity'; // Asegúrate de importar CursoEntity
import { RecursoClaseEntity } from 'src/modules/recurso_clase/entities/recurso-clase.entity';

@Entity('clases')
export class ClaseEntity extends BaseEntity {
  @Column({ name: 'titulo_seccion' })
  tituloSeccion: string;

  @Column({ name: 'url_video' })
  urlVideo: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => CursoEntity, curso => curso.clases, { eager: true })
  curso: CursoEntity; 

  @OneToMany(() => RecursoClaseEntity, recursoClase => recursoClase.clase)
  recursosClase: RecursoClaseEntity[];
}