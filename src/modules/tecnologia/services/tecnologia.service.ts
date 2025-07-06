// src/modules/tecnologia/services/tecnologia.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TecnologiaEntity } from '../entities/tecnologia.entity';
import { CreateTecnologiaDto } from '../dto/create-tecnologia.dto';
import { UpdateTecnologiaDto } from '../dto/update-tecnologia.dto';
import { MaquinaEntity } from 'src/modules/maquina/entities/maquina.entity';

@Injectable()
export class TecnologiaService {
  constructor(
    @InjectRepository(TecnologiaEntity)
    private readonly tecnologiaRepo: Repository<TecnologiaEntity>,
    @InjectRepository(MaquinaEntity)
    private readonly maquinaRepo: Repository<MaquinaEntity>
  ) {}

  async create(dto: CreateTecnologiaDto): Promise<TecnologiaEntity> {
    const tecnologia = this.tecnologiaRepo.create({ ...dto });
    return this.tecnologiaRepo.save(tecnologia);
  }

  async findAll(): Promise<TecnologiaEntity[]> {
    return this.tecnologiaRepo.find({ where: { isDeleted: false }, relations: ['maquinas'] });
  }

  async findOne(id: string): Promise<TecnologiaEntity> {
    const tecnologia = await this.tecnologiaRepo.findOne({ where: { id, isDeleted: false }, relations: ['maquinas'] });
    if (!tecnologia) throw new NotFoundException('Tecnología no encontrada');
    return tecnologia;
  }

  async update(id: string, dto: UpdateTecnologiaDto): Promise<TecnologiaEntity> {
    const tecnologia = await this.findOne(id);

    // Actualizar propiedades básicas
    Object.assign(tecnologia, dto);

    return this.tecnologiaRepo.save(tecnologia);
  }

  async softDelete(id: string): Promise<void> {
    const tecnologia = await this.findOne(id);
    tecnologia.isDeleted = true;
    await this.tecnologiaRepo.save(tecnologia);
  }
}