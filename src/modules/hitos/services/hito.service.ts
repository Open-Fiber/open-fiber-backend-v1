// src/modules/hito/services/hito.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HitoEntity } from './../entities/hito.entity';
import { CreateHitoDto } from './../dto/create-hito.dto';
import { UpdateHitoDto } from './../dto/update-hito.dto';
import { MaquinaEntity } from './../../../modules/maquina/entities/maquina.entity';

@Injectable()
export class HitoService {
  constructor(
    @InjectRepository(HitoEntity)
    private readonly hitoRepo: Repository<HitoEntity>,
    @InjectRepository(MaquinaEntity)
    private readonly maquinaRepo: Repository<MaquinaEntity>
  ) {}

  async create(dto: CreateHitoDto): Promise<HitoEntity> {
    const maquina = await this.maquinaRepo.findOneBy({ id: dto.maquinaId });
    if (!maquina) throw new NotFoundException('Máquina no encontrada');

    const hito = this.hitoRepo.create({ ...dto, maquina });
    return this.hitoRepo.save(hito);
  }

  async findAll(): Promise<HitoEntity[]> {
    return this.hitoRepo.find({ where: { isDeleted: false } });
  }

  async findOne(id: string): Promise<HitoEntity> {
    const hito = await this.hitoRepo.findOne({ where: { id, isDeleted: false } });
    if (!hito) throw new NotFoundException('Hito no encontrado');
    return hito;
  }

  async update(id: string, dto: UpdateHitoDto): Promise<HitoEntity> {
    const hito = await this.findOne(id);
    Object.assign(hito, dto);

    if (dto.maquinaId) {
      const maquina = await this.maquinaRepo.findOneBy({ id: dto.maquinaId });
      if (!maquina) throw new NotFoundException('Máquina no encontrada');
      hito.maquina = maquina;
    }

    return this.hitoRepo.save(hito);
  }

  async softDelete(id: string): Promise<void> {
    const hito = await this.findOne(id);
    hito.isDeleted = true;
    await this.hitoRepo.save(hito);
  }
}