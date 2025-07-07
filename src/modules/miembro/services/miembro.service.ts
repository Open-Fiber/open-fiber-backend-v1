// src/modules/miembro/services/miembro.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MiembroEntity } from './../entities/miembro.entity';
import { CreateMiembroDto } from './../dto/create-miembro.dto';
import { UpdateMiembroDto } from './../dto/update-miembro.dto';
import { UsuarioEntity } from './../../usuario/entities/usuario.entity'; // Importa UsuarioEntity
import { OrganizacionEntity } from './../../organizacion/entities/organizacion.entity'; // Importa OrganizacionEntity

@Injectable()
export class MiembroService {
  constructor(
    @InjectRepository(MiembroEntity)
    private readonly miembroRepo: Repository<MiembroEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepo: Repository<UsuarioEntity>,
    @InjectRepository(OrganizacionEntity)
    private readonly organizacionRepo: Repository<OrganizacionEntity>,
  ) {}

  async create(dto: CreateMiembroDto): Promise<MiembroEntity> {
    const usuario = await this.usuarioRepo.findOneBy({ id: dto.usuarioId });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const organizacion = await this.organizacionRepo.findOneBy({ id: dto.organizacionId });
    if (!organizacion) throw new NotFoundException('Organización no encontrada');

    // Verificar si ya existe un miembro para este usuario en esta organización
    const existingMiembro = await this.miembroRepo.findOne({
      where: {
        usuario: { id: dto.usuarioId },
        organizacion: { id: dto.organizacionId },
        isDeleted: false,
      },
    });

    if (existingMiembro) {
      throw new ConflictException('Este usuario ya es miembro de esta organización.');
    }

    const miembro = this.miembroRepo.create({ ...dto, usuario, organizacion });
    return this.miembroRepo.save(miembro);
  }

  async findAll(): Promise<MiembroEntity[]> {
    return this.miembroRepo.find({ where: { isDeleted: false }, relations: ['usuario', 'organizacion'] });
  }

  async findOne(id: string): Promise<MiembroEntity> {
    const miembro = await this.miembroRepo.findOne({ where: { id, isDeleted: false }, relations: ['usuario', 'organizacion'] });
    if (!miembro) throw new NotFoundException('Miembro no encontrado');
    return miembro;
  }

  async update(id: string, dto: UpdateMiembroDto): Promise<MiembroEntity> {
    const miembro = await this.findOne(id);
    
    // Si se intenta cambiar el usuario o la organización, verificar conflicto
    if ((dto.usuarioId && dto.usuarioId !== miembro.usuario.id) || (dto.organizacionId && dto.organizacionId !== miembro.organizacion.id)) {
        const newUsuario = dto.usuarioId ? await this.usuarioRepo.findOneBy({ id: dto.usuarioId }) : miembro.usuario;
        if (dto.usuarioId && !newUsuario) throw new NotFoundException('Nuevo usuario no encontrado');

        const newOrganizacion = dto.organizacionId ? await this.organizacionRepo.findOneBy({ id: dto.organizacionId }) : miembro.organizacion;
        if (dto.organizacionId && !newOrganizacion) throw new NotFoundException('Nueva organización no encontrada');

        const existingConflict = await this.miembroRepo.findOne({
            where: {
                usuario: { id: newUsuario.id },
                organizacion: { id: newOrganizacion.id },
                isDeleted: false,
            },
        });

        if (existingConflict && existingConflict.id !== id) { // Asegura que no sea el mismo miembro
            throw new ConflictException('La combinación de usuario y organización ya existe en otro miembro activo.');
        }

        if (dto.usuarioId) miembro.usuario = newUsuario;
        if (dto.organizacionId) miembro.organizacion = newOrganizacion;
    }

    Object.assign(miembro, dto); // Aplica otras propiedades como isActivo
    return this.miembroRepo.save(miembro);
  }

  async softDelete(id: string): Promise<void> {
    const miembro = await this.findOne(id);
    miembro.isDeleted = true;
    await this.miembroRepo.save(miembro);
  }
}