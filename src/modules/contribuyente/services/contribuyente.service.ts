import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContribuyenteEntity } from './../entities/contribuyente.entity';
import { CreateContribuyenteDto } from './../dto/create-contribuyente.dto';
import { UpdateContribuyenteDto } from './../dto/update-contribuyente.dto';
import { MaquinaEntity } from './../../../modules/maquina/entities/maquina.entity';

@Injectable()
export class ContribuyenteService {
  constructor(
    @InjectRepository(ContribuyenteEntity)
    private readonly contribuyenteRepo: Repository<ContribuyenteEntity>,
    @InjectRepository(MaquinaEntity)
    private readonly maquinaRepo: Repository<MaquinaEntity>
  ) {}

  async create(dto: CreateContribuyenteDto): Promise<ContribuyenteEntity> {
    const maquina = await this.maquinaRepo.findOneBy({ id: dto.maquinaId });
    if (!maquina) throw new NotFoundException('Máquina no encontrada');

    const contribuyente = this.contribuyenteRepo.create({ ...dto, maquina });
    return this.contribuyenteRepo.save(contribuyente);
  }

  async findAll(): Promise<ContribuyenteEntity[]> {
    return this.contribuyenteRepo.find({ where: { isDeleted: false } });
  }

  async findOne(id: string): Promise<ContribuyenteEntity> {
    const contribuyente = await this.contribuyenteRepo.findOne({ where: { id, isDeleted: false } });
    if (!contribuyente) throw new NotFoundException('Contribuyente no encontrado');
    return contribuyente;
  }

  async update(id: string, dto: UpdateContribuyenteDto): Promise<ContribuyenteEntity> {
    const contribuyente = await this.findOne(id);
    Object.assign(contribuyente, dto);

    if (dto.maquinaId) {
      const maquina = await this.maquinaRepo.findOneBy({ id: dto.maquinaId });
      if (!maquina) throw new NotFoundException('Máquina no encontrada');
      contribuyente.maquina = maquina;
    }

    return this.contribuyenteRepo.save(contribuyente);
  }

  async softDelete(id: string): Promise<void> {
    const contribuyente = await this.findOne(id);
    contribuyente.isDeleted = true;
    await this.contribuyenteRepo.save(contribuyente);
  }
}