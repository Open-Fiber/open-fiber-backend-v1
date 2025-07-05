// src/modules/paso-construccion/entities/paso-construccion.entity.ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { MaquinaEntity } from 'src/modules/maquina/entities/maquina.entity';

@Entity('pasos_construccion')
export class PasoConstruccionEntity extends BaseEntity {
  @Column({ name: 'nro_paso' })
  nroPaso: string;

  @Column()
  descripcion: string;

  @Column({ name: 'url_imagen_guia' })
  urlImagenGuia: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => MaquinaEntity, maquina => maquina.pasosConstruccion, { eager: true })
  maquina: MaquinaEntity;
}