import { Entity, Column, ManyToOne, Check, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { ProyectoEntity } from 'src/modules/proyecto/entities/proyecto.entity';
import { ContribuyenteEntity } from 'src/modules/contribuyente/entities/contribuyente.entity';
import { HitoEntity } from 'src/modules/hitos/entities/hito.entity';

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

}
