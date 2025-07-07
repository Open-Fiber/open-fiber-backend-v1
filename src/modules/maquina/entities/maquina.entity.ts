import { Entity, Column, ManyToOne, Check, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './../../../common/entities/base.entity';
import { ProyectoEntity } from './../../../modules/proyecto/entities/proyecto.entity';
import { ContribuyenteEntity } from './../../../modules/contribuyente/entities/contribuyente.entity';
import { HitoEntity } from './../../../modules/hitos/entities/hito.entity';
import { ContextoDeAplicacionEntity } from './../../../modules/contexto_de_aplicacion/entities/contexto-de-aplicacion.entity';
import { CasoDeUsoEntity } from './../../../modules/caso_de_uso/entities/caso-de-uso.entity';
import { PasoConstruccionEntity } from './../../../modules/paso_construccion/entities/paso-construccion.entity';
import { LikeEntity } from './../../../modules/like/entities/like.entity';

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
}
