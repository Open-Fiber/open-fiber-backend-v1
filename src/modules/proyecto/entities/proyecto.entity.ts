import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { CuentaEntity } from '../../../modules/cuenta/entities/cuenta.entity';

@Entity('proyectos')
export class ProyectoEntity extends BaseEntity {
  @Column()
  titulo: string;

  @Column()
  objetivo: string;

  @Column()
  descripcion: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => CuentaEntity, cuenta => cuenta.proyectos, { eager: true })
  cuenta: CuentaEntity;
}
