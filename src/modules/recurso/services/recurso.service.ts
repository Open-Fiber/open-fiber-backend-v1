// src/modules/recurso/services/recurso.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RecursoEntity } from '../entities/recurso.entity';
import { CreateRecursoDto } from '../dto/create-recurso.dto';
import { UpdateRecursoDto } from '../dto/update-recurso.dto';
import { MaquinaEntity } from 'src/modules/maquina/entities/maquina.entity';

@Injectable()
export class RecursoService {
  constructor(
    @InjectRepository(RecursoEntity)
    private readonly recursoRepo: Repository<RecursoEntity>,
    @InjectRepository(MaquinaEntity)
    private readonly maquinaRepo: Repository<MaquinaEntity>
  ) {}

  async create(dto: CreateRecursoDto): Promise<RecursoEntity> {
    const maquinas = await this.maquinaRepo.findBy({ id: In(dto.maquinaIds) });
    if (maquinas.length !== dto.maquinaIds.length) {
      throw new NotFoundException('Algunas máquinas no fueron encontradas.');
    }

    const recurso = this.recursoRepo.create({ ...dto, maquinas });
    return this.recursoRepo.save(recurso);
  }

  async findAll(): Promise<RecursoEntity[]> {
    return this.recursoRepo.find({ where: { isDeleted: false }, relations: ['maquinas'] });
  }

  async findOne(id: string): Promise<RecursoEntity> {
    const recurso = await this.recursoRepo.findOne({ where: { id, isDeleted: false }, relations: ['maquinas'] });
    if (!recurso) throw new NotFoundException('Recurso no encontrado');
    return recurso;
  }

  async update(id: string, dto: UpdateRecursoDto): Promise<RecursoEntity> {
    const recurso = await this.findOne(id);
    
    // Actualizar propiedades básicas
    Object.assign(recurso, dto);

    // Actualizar relaciones ManyToMany
    if (dto.maquinaIds) {
      const maquinas = await this.maquinaRepo.findBy({ id: In(dto.maquinaIds) });
      if (maquinas.length !== dto.maquinaIds.length) {
        throw new NotFoundException('Algunas máquinas para actualizar no fueron encontradas.');
      }
      recurso.maquinas = maquinas;
    }

    return this.recursoRepo.save(recurso);
  }

  async softDelete(id: string): Promise<void> {
    const recurso = await this.findOne(id);
    recurso.isDeleted = true;
    await this.recursoRepo.save(recurso);
  }
}