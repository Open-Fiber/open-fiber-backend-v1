import { Entity, Column, ManyToOne, Check, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { ProyectoEntity } from 'src/modules/proyecto/entities/proyecto.entity';
import { ContribuyenteEntity } from 'src/modules/contribuyente/entities/contribuyente.entity';
import { HitoEntity } from 'src/modules/hitos/entities/hito.entity';
import { ContextoDeAplicacionEntity } from 'src/modules/contexto_de_aplicacion/entities/contexto-de-aplicacion.entity';
import { CasoDeUsoEntity } from 'src/modules/caso_de_uso/entities/caso-de-uso.entity';
import { PasoConstruccionEntity } from 'src/modules/paso_construccion/entities/paso-construccion.entity';
import { RecursoEntity } from 'src/modules/recurso/entities/recurso.entity';
import { TecnologiaEntity } from 'src/modules/tecnologia/entities/tecnologia.entity';
import { LikeEntity } from 'src/modules/like/entities/like.entity';

@Entity('maquinas')
@Check(`"categoria" IN ('estetica', 'electronica', 'mecanica', 'codigo', 'original')`)
export class MaquinaEntity extends BaseEntity {
  @Column()
  informacion: string;

  @Column()
  version: string;

  @Column()
  impacto: string;

  @Column()
  evolucion: string;

  @Column()
  categoria: string;

  @Column({ default: false, name: 'is_private' })
  isPrivate: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => ProyectoEntity, proyecto => proyecto.maquinas, { eager: true })
  proyecto: ProyectoEntity;

  @ManyToOne(() => MaquinaEntity, maquina => maquina.copias, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  maquinaOriginal?: MaquinaEntity;

  @OneToMany(() => MaquinaEntity, maquina => maquina.maquinaOriginal)
  copias: MaquinaEntity[];

  @ManyToOne(() => ContribuyenteEntity, contribuyente => contribuyente.maquina)
  contribuyentes: ContribuyenteEntity[];

  @ManyToOne(() => HitoEntity, hito => hito.maquina)
  hitos: HitoEntity[];

  @ManyToOne(() => ContextoDeAplicacionEntity, contextosDeAplicacion => contextosDeAplicacion.maquina)
  contextosDeAplicacion: ContextoDeAplicacionEntity[];

  @ManyToOne(() => CasoDeUsoEntity, casosDeUso => casosDeUso.maquina)
  casosDeUso: CasoDeUsoEntity[];

  @ManyToOne(() => PasoConstruccionEntity, pasoConstruccion => pasoConstruccion.maquina)
  pasosConstruccion: PasoConstruccionEntity[];

  @ManyToOne(() => LikeEntity, like => like.maquina)
  likes: LikeEntity[];
  
  @ManyToMany(() => RecursoEntity, recurso => recurso.maquinas, { eager: true })
  @JoinTable({
    name: 'maquina_recurso', // Nombre de la tabla intermedia
    joinColumn: { name: 'maquina_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'recurso_id', referencedColumnName: 'id' },
  })
  recursos: RecursoEntity[];

  @ManyToMany(() => TecnologiaEntity, tecnologia => tecnologia.maquinas, { eager: true })
  @JoinTable({
    name: 'maquina_tecnologia', // Nombre de la tabla intermedia
    joinColumn: { name: 'maquina_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tecnologia_id', referencedColumnName: 'id' },
  })
  tecnologias: TecnologiaEntity[];
}
