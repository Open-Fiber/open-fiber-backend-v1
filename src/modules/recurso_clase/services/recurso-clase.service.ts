// src/modules/recurso-clase/services/recurso-clase.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecursoClaseEntity } from '../entities/recurso-clase.entity';
import { CreateRecursoClaseDto } from '../dto/create-recurso-clase.dto';
import { UpdateRecursoClaseDto } from '../dto/update-recurso-clase.dto';
import { ClaseEntity } from 'src/modules/clase/entities/clase.entity'; // Importa ClaseEntity

@Injectable()
export class RecursoClaseService {
  constructor(
    @InjectRepository(RecursoClaseEntity)
    private readonly recursoClaseRepo: Repository<RecursoClaseEntity>,
    @InjectRepository(ClaseEntity)
    private readonly claseRepo: Repository<ClaseEntity>,
  ) {}

  async create(dto: CreateRecursoClaseDto): Promise<RecursoClaseEntity> {
    const clase = await this.claseRepo.findOneBy({ id: dto.claseId });
    if (!clase) throw new NotFoundException('Clase no encontrada');

    const recursoClase = this.recursoClaseRepo.create({ ...dto, clase });
    return this.recursoClaseRepo.save(recursoClase);
  }

  async findAll(): Promise<RecursoClaseEntity[]> {
    return this.recursoClaseRepo.find({ where: { isDeleted: false }, relations: ['clase'] });
  }

  async findOne(id: string): Promise<RecursoClaseEntity> {
    const recursoClase = await this.recursoClaseRepo.findOne({ where: { id, isDeleted: false }, relations: ['clase'] });
    if (!recursoClase) throw new NotFoundException('Recurso de clase no encontrado');
    return recursoClase;
  }

  async update(id: string, dto: UpdateRecursoClaseDto): Promise<RecursoClaseEntity> {
    const recursoClase = await this.findOne(id);
    Object.assign(recursoClase, dto);

    if (dto.claseId && dto.claseId !== recursoClase.clase.id) {
      const newClase = await this.claseRepo.findOneBy({ id: dto.claseId });
      if (!newClase) throw new NotFoundException('Nueva clase no encontrada');
      recursoClase.clase = newClase;
    }

    return this.recursoClaseRepo.save(recursoClase);
  }

  async softDelete(id: string): Promise<void> {
    const recursoClase = await this.findOne(id);
    recursoClase.isDeleted = true;
    await this.recursoClaseRepo.save(recursoClase);
  }
}