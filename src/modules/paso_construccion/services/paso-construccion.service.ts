// src/modules/paso-construccion/services/paso-construccion.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasoConstruccionEntity } from './../entities/paso-construccion.entity';
import { CreatePasoConstruccionDto } from './../dto/create-paso-construccion.dto';
import { UpdatePasoConstruccionDto } from './../dto/update-paso-construccion.dto';
import { MaquinaEntity } from './../../../modules/maquina/entities/maquina.entity';

@Injectable()
export class PasoConstruccionService {
  constructor(
    @InjectRepository(PasoConstruccionEntity)
    private readonly pasoConstruccionRepo: Repository<PasoConstruccionEntity>,
    @InjectRepository(MaquinaEntity)
    private readonly maquinaRepo: Repository<MaquinaEntity>
  ) {}

  async create(dto: CreatePasoConstruccionDto): Promise<PasoConstruccionEntity> {
    const maquina = await this.maquinaRepo.findOneBy({ id: dto.maquinaId });
    if (!maquina) throw new NotFoundException('Máquina no encontrada');

    const pasoConstruccion = this.pasoConstruccionRepo.create({ ...dto, maquina });
    return this.pasoConstruccionRepo.save(pasoConstruccion);
  }

  async findAll(): Promise<PasoConstruccionEntity[]> {
    return this.pasoConstruccionRepo.find({ where: { isDeleted: false } });
  }

  async findOne(id: string): Promise<PasoConstruccionEntity> {
    const pasoConstruccion = await this.pasoConstruccionRepo.findOne({ where: { id, isDeleted: false } });
    if (!pasoConstruccion) throw new NotFoundException('Paso de construcción no encontrado');
    return pasoConstruccion;
  }

  async update(id: string, dto: UpdatePasoConstruccionDto): Promise<PasoConstruccionEntity> {
    const pasoConstruccion = await this.findOne(id);
    Object.assign(pasoConstruccion, dto);

    if (dto.maquinaId) {
      const maquina = await this.maquinaRepo.findOneBy({ id: dto.maquinaId });
      if (!maquina) throw new NotFoundException('Máquina no encontrada');
      pasoConstruccion.maquina = maquina;
    }

    return this.pasoConstruccionRepo.save(pasoConstruccion);
  }

  async softDelete(id: string): Promise<void> {
    const pasoConstruccion = await this.findOne(id);
    pasoConstruccion.isDeleted = true;
    await this.pasoConstruccionRepo.save(pasoConstruccion);
  }
}