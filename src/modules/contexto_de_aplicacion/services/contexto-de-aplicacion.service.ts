// src/modules/contexto-de-aplicacion/services/contexto-de-aplicacion.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContextoDeAplicacionEntity } from '../entities/contexto-de-aplicacion.entity';
import { CreateContextoDeAplicacionDto } from '../dto/create-contexto-de-aplicacion.dto';
import { UpdateContextoDeAplicacionDto } from '../dto/update-contexto-de-aplicacion.dto';
import { MaquinaEntity } from 'src/modules/maquina/entities/maquina.entity';

@Injectable()
export class ContextoDeAplicacionService {
  constructor(
    @InjectRepository(ContextoDeAplicacionEntity)
    private readonly contextoDeAplicacionRepo: Repository<ContextoDeAplicacionEntity>,
    @InjectRepository(MaquinaEntity)
    private readonly maquinaRepo: Repository<MaquinaEntity>
  ) {}

  async create(dto: CreateContextoDeAplicacionDto): Promise<ContextoDeAplicacionEntity> {
    const maquina = await this.maquinaRepo.findOneBy({ id: dto.maquinaId });
    if (!maquina) throw new NotFoundException('Máquina no encontrada');

    const contextoDeAplicacion = this.contextoDeAplicacionRepo.create({ ...dto, maquina });
    return this.contextoDeAplicacionRepo.save(contextoDeAplicacion);
  }

  async findAll(): Promise<ContextoDeAplicacionEntity[]> {
    return this.contextoDeAplicacionRepo.find({ where: { isDeleted: false } });
  }

  async findOne(id: string): Promise<ContextoDeAplicacionEntity> {
    const contextoDeAplicacion = await this.contextoDeAplicacionRepo.findOne({ where: { id, isDeleted: false } });
    if (!contextoDeAplicacion) throw new NotFoundException('Contexto de aplicación no encontrado');
    return contextoDeAplicacion;
  }

  async update(id: string, dto: UpdateContextoDeAplicacionDto): Promise<ContextoDeAplicacionEntity> {
    const contextoDeAplicacion = await this.findOne(id);
    Object.assign(contextoDeAplicacion, dto);

    if (dto.maquinaId) {
      const maquina = await this.maquinaRepo.findOneBy({ id: dto.maquinaId });
      if (!maquina) throw new NotFoundException('Máquina no encontrada');
      contextoDeAplicacion.maquina = maquina;
    }

    return this.contextoDeAplicacionRepo.save(contextoDeAplicacion);
  }

  async softDelete(id: string): Promise<void> {
    const contextoDeAplicacion = await this.findOne(id);
    contextoDeAplicacion.isDeleted = true;
    await this.contextoDeAplicacionRepo.save(contextoDeAplicacion);
  }
}