// src/modules/caso-de-uso/services/caso-de-uso.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CasoDeUsoEntity } from '../entities/caso-de-uso.entity';
import { CreateCasoDeUsoDto } from '../dto/create-caso-de-uso.dto';
import { UpdateCasoDeUsoDto } from '../dto/update-caso-de-uso.dto';
import { MaquinaEntity } from 'src/modules/maquina/entities/maquina.entity';

@Injectable()
export class CasoDeUsoService {
  constructor(
    @InjectRepository(CasoDeUsoEntity)
    private readonly casoDeUsoRepo: Repository<CasoDeUsoEntity>,
    @InjectRepository(MaquinaEntity)
    private readonly maquinaRepo: Repository<MaquinaEntity>
  ) {}

  async create(dto: CreateCasoDeUsoDto): Promise<CasoDeUsoEntity> {
    const maquina = await this.maquinaRepo.findOneBy({ id: dto.maquinaId });
    if (!maquina) throw new NotFoundException('Máquina no encontrada');

    const casoDeUso = this.casoDeUsoRepo.create({ ...dto, maquina });
    return this.casoDeUsoRepo.save(casoDeUso);
  }

  async findAll(): Promise<CasoDeUsoEntity[]> {
    return this.casoDeUsoRepo.find({ where: { isDeleted: false } });
  }

  async findOne(id: string): Promise<CasoDeUsoEntity> {
    const casoDeUso = await this.casoDeUsoRepo.findOne({ where: { id, isDeleted: false } });
    if (!casoDeUso) throw new NotFoundException('Caso de uso no encontrado');
    return casoDeUso;
  }

  async update(id: string, dto: UpdateCasoDeUsoDto): Promise<CasoDeUsoEntity> {
    const casoDeUso = await this.findOne(id);
    Object.assign(casoDeUso, dto);

    if (dto.maquinaId) {
      const maquina = await this.maquinaRepo.findOneBy({ id: dto.maquinaId });
      if (!maquina) throw new NotFoundException('Máquina no encontrada');
      casoDeUso.maquina = maquina;
    }

    return this.casoDeUsoRepo.save(casoDeUso);
  }

  async softDelete(id: string): Promise<void> {
    const casoDeUso = await this.findOne(id);
    casoDeUso.isDeleted = true;
    await this.casoDeUsoRepo.save(casoDeUso);
  }
}