// src/modules/like/services/like.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from './../entities/like.entity';
import { CreateLikeDto } from './../dto/create-like.dto';
import { MaquinaEntity } from './../../../modules/maquina/entities/maquina.entity';
import { CuentaEntity } from './../../../modules/cuenta/entities/cuenta.entity'; // Importa CuentaEntity

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepo: Repository<LikeEntity>,
    @InjectRepository(MaquinaEntity)
    private readonly maquinaRepo: Repository<MaquinaEntity>,
    @InjectRepository(CuentaEntity)
    private readonly cuentaRepo: Repository<CuentaEntity>,
  ) {}

  async create(dto: CreateLikeDto): Promise<LikeEntity> {
    const maquina = await this.maquinaRepo.findOneBy({ id: dto.maquinaId });
    if (!maquina) throw new NotFoundException('Máquina no encontrada');

    const cuenta = await this.cuentaRepo.findOneBy({ id: dto.cuentaId });
    if (!cuenta) throw new NotFoundException('Cuenta no encontrada');

    // Opcional: Evitar duplicados si una cuenta solo puede dar un like por máquina
    const existingLike = await this.likeRepo.findOne({
      where: {
        maquina: { id: dto.maquinaId },
        cuenta: { id: dto.cuentaId },
        isDeleted: false
      },
    });
    if (existingLike) {
      throw new ConflictException('Esta cuenta ya ha dado like a esta máquina.');
    }

    const like = this.likeRepo.create({ maquina, cuenta });
    return this.likeRepo.save(like);
  }

  async findAll(): Promise<LikeEntity[]> {
    return this.likeRepo.find({ where: { isDeleted: false }, relations: ['maquina', 'cuenta'] });
  }

  async findOne(id: string): Promise<LikeEntity> {
    const like = await this.likeRepo.findOne({ where: { id, isDeleted: false }, relations: ['maquina', 'cuenta'] });
    if (!like) throw new NotFoundException('Like no encontrado');
    return like;
  }

  async softDelete(id: string): Promise<void> {
    const like = await this.findOne(id);
    like.isDeleted = true;
    await this.likeRepo.save(like);
  }
}