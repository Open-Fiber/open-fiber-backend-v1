import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './../../../common/entities/base.entity';
import { MaquinaEntity } from './../../../modules/maquina/entities/maquina.entity';

@Entity('contribuyentes')
export class ContribuyenteEntity extends BaseEntity {
  @Column({ name: 'nombre_completo' })
  nombreCompleto: string;

  @Column()
  cargo: string;

  @Column({ name: 'foto_url' })
  fotoUrl: string;

  @Column({ name: 'perfil_linkedin' })
  perfilLinkedin: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => MaquinaEntity, maquina => maquina.contribuyentes, { eager: true })
  maquina: MaquinaEntity;
}