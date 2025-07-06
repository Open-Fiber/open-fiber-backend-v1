// src/modules/miembro/entities/miembro.entity.ts
import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { UsuarioEntity } from 'src/modules/usuario/entities/usuario.entity'; // Asumo que tienes UsuarioEntity
import { OrganizacionEntity } from 'src/modules/organizacion/entities/organizacion.entity'; // Asumo que tienes OrganizacionEntity

@Entity('miembros')
@Unique(['usuario', 'organizacion']) // Asegura que un usuario solo pueda ser miembro de una organización una vez
export class MiembroEntity extends BaseEntity {
  @Column({ default: true, name: 'is_activo' })
  isActivo: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => UsuarioEntity, { eager: true })
  usuario: UsuarioEntity; // El miembro se refiere a un usuario

  @ManyToOne(() => OrganizacionEntity, organizacion => organizacion.miembros, { eager: true })
  organizacion: OrganizacionEntity; // El miembro pertenece a una organización
}