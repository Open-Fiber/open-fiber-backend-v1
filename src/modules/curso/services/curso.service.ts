// src/modules/curso/services/curso.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CursoEntity } from './../entities/curso.entity';
import { CreateCursoDto } from './../dto/create-curso.dto';
import { UpdateCursoDto } from './../dto/update-curso.dto';
import { CuentaEntity } from './../../../modules/cuenta/entities/cuenta.entity'; // Importa CuentaEntity

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(CursoEntity)
    private readonly cursoRepo: Repository<CursoEntity>,
    @InjectRepository(CuentaEntity)
    private readonly cuentaRepo: Repository<CuentaEntity>,
  ) {}

  async create(dto: CreateCursoDto): Promise<CursoEntity> {
    const cuenta = await this.cuentaRepo.findOneBy({ id: dto.creadoPorId });
    if (!cuenta) throw new NotFoundException('Cuenta creadora no encontrada');

    const curso = this.cursoRepo.create({ ...dto, creador: cuenta });
    return this.cursoRepo.save(curso);
  }

  async findAll(): Promise<CursoEntity[]> {
    return this.cursoRepo.find({ where: { isDeleted: false }, relations: ['creadoPor'] });
  }

  async findOne(id: string): Promise<CursoEntity> {
    const curso = await this.cursoRepo.findOne({ where: { id, isDeleted: false }, relations: ['creadoPor'] });
    if (!curso) throw new NotFoundException('Curso no encontrado');
    return curso;
  }

  async update(id: string, dto: UpdateCursoDto): Promise<CursoEntity> {
    const curso = await this.findOne(id);
    Object.assign(curso, dto);

    if (dto.creadoPorId && dto.creadoPorId !== curso.creador.id) {
      const newCuenta = await this.cuentaRepo.findOneBy({ id: dto.creadoPorId });
      if (!newCuenta) throw new NotFoundException('Nueva cuenta creadora no encontrada');
      curso.creador = newCuenta;
    }

    return this.cursoRepo.save(curso);
  }

  async softDelete(id: string): Promise<void> {
    const curso = await this.findOne(id);
    curso.isDeleted = true;
    await this.cursoRepo.save(curso);
  }
}