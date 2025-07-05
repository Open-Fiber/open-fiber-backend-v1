// src/modules/clase/services/clase.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaseEntity } from '../entities/clase.entity';
import { CreateClaseDto } from '../dto/create-clase.dto';
import { UpdateClaseDto } from '../dto/update-clase.dto';
import { CursoEntity } from 'src/modules/curso/entities/curso.entity'; // Importa CursoEntity

@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(ClaseEntity)
    private readonly claseRepo: Repository<ClaseEntity>,
    @InjectRepository(CursoEntity)
    private readonly cursoRepo: Repository<CursoEntity>,
  ) {}

  async create(dto: CreateClaseDto): Promise<ClaseEntity> {
    const curso = await this.cursoRepo.findOneBy({ id: dto.cursoId });
    if (!curso) throw new NotFoundException('Curso no encontrado');

    const clase = this.claseRepo.create({ ...dto, curso });
    return this.claseRepo.save(clase);
  }

  async findAll(): Promise<ClaseEntity[]> {
    return this.claseRepo.find({ where: { isDeleted: false }, relations: ['curso'] });
  }

  async findOne(id: string): Promise<ClaseEntity> {
    const clase = await this.claseRepo.findOne({ where: { id, isDeleted: false }, relations: ['curso'] });
    if (!clase) throw new NotFoundException('Clase no encontrada');
    return clase;
  }

  async update(id: string, dto: UpdateClaseDto): Promise<ClaseEntity> {
    const clase = await this.findOne(id);
    Object.assign(clase, dto);

    if (dto.cursoId && dto.cursoId !== clase.curso.id) {
      const newCurso = await this.cursoRepo.findOneBy({ id: dto.cursoId });
      if (!newCurso) throw new NotFoundException('Nuevo curso no encontrado');
      clase.curso = newCurso;
    }

    return this.claseRepo.save(clase);
  }

  async softDelete(id: string): Promise<void> {
    const clase = await this.findOne(id);
    clase.isDeleted = true;
    await this.claseRepo.save(clase);
  }
}