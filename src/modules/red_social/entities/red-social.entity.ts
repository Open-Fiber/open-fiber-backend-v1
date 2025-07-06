// src/modules/red-social/entities/red-social.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './../../../common/entities/base.entity';

@Entity('redes_sociales')
export class RedSocialEntity extends BaseEntity {
  @Column()
  nombre: string;

  @Column({ name: 'logo_url' })
  logoUrl: string;

  @Column({ default: false })
  isDeleted: boolean;
}