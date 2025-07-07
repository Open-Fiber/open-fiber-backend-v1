// src/modules/comentario/services/comentario.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComentarioEntity } from './../entities/comentario.entity';
import { CreateComentarioDto } from './../dto/create-comentario.dto';
import { UpdateComentarioDto } from './../dto/update-comentario.dto';
import { CuentaEntity } from './../../../modules/cuenta/entities/cuenta.entity'; // Importa CuentaEntity
import { ClaseEntity } from './../../../modules/clase/entities/clase.entity'; // Importa ClaseEntity

@Injectable()
export class ComentarioService {
  constructor(
    @InjectRepository(ComentarioEntity)
    private readonly comentarioRepo: Repository<ComentarioEntity>,
    @InjectRepository(CuentaEntity)
    private readonly cuentaRepo: Repository<CuentaEntity>,
    @InjectRepository(ClaseEntity)
    private readonly claseRepo: Repository<ClaseEntity>,
  ) {}

  async create(dto: CreateComentarioDto): Promise<ComentarioEntity> {
    const cuenta = await this.cuentaRepo.findOneBy({ id: dto.cuentaId });
    if (!cuenta) throw new NotFoundException('Cuenta no encontrada');

    const clase = await this.claseRepo.findOneBy({ id: dto.claseId });
    if (!clase) throw new NotFoundException('Clase no encontrada');

    const comentario = this.comentarioRepo.create({ ...dto, cuenta, clase });
    return this.comentarioRepo.save(comentario);
  }

  async findAll(): Promise<ComentarioEntity[]> {
    return this.comentarioRepo.find({ where: { isDeleted: false }, relations: ['cuenta', 'clase'] });
  }

  async findOne(id: string): Promise<ComentarioEntity> {
    const comentario = await this.comentarioRepo.findOne({ where: { id, isDeleted: false }, relations: ['cuenta', 'clase'] });
    if (!comentario) throw new NotFoundException('Comentario no encontrado');
    return comentario;
  }

  async update(id: string, dto: UpdateComentarioDto): Promise<ComentarioEntity> {
    const comentario = await this.findOne(id);
    Object.assign(comentario, dto);

    if (dto.cuentaId && dto.cuentaId !== comentario.cuenta.id) {
      const newCuenta = await this.cuentaRepo.findOneBy({ id: dto.cuentaId });
      if (!newCuenta) throw new NotFoundException('Nueva cuenta no encontrada');
      comentario.cuenta = newCuenta;
    }

    if (dto.claseId && dto.claseId !== comentario.clase.id) {
      const newClase = await this.claseRepo.findOneBy({ id: dto.claseId });
      if (!newClase) throw new NotFoundException('Nueva clase no encontrada');
      comentario.clase = newClase;
    }

    return this.comentarioRepo.save(comentario);
  }

  async softDelete(id: string): Promise<void> {
    const comentario = await this.findOne(id);
    comentario.isDeleted = true;
    await this.comentarioRepo.save(comentario);
  }
}