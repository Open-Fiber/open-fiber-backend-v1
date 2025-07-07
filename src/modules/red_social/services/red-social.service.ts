// src/modules/red-social/services/red-social.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedSocialEntity } from './../entities/red-social.entity';
import { CreateRedSocialDto } from './../dto/create-red-social.dto';
import { UpdateRedSocialDto } from './../dto/update-red-social.dto';

@Injectable()
export class RedSocialService {
  constructor(
    @InjectRepository(RedSocialEntity)
    private readonly redSocialRepo: Repository<RedSocialEntity>,
  ) {}

  async create(dto: CreateRedSocialDto): Promise<RedSocialEntity> {
    const redSocial = this.redSocialRepo.create(dto);
    return this.redSocialRepo.save(redSocial);
  }

  async findAll(): Promise<RedSocialEntity[]> {
    return this.redSocialRepo.find({ where: { isDeleted: false } });
  }

  async findOne(id: string): Promise<RedSocialEntity> {
    const redSocial = await this.redSocialRepo.findOne({ where: { id, isDeleted: false } });
    if (!redSocial) throw new NotFoundException('Red Social no encontrada');
    return redSocial;
  }

  async update(id: string, dto: UpdateRedSocialDto): Promise<RedSocialEntity> {
    const redSocial = await this.findOne(id);
    Object.assign(redSocial, dto);
    return this.redSocialRepo.save(redSocial);
  }

  async softDelete(id: string): Promise<void> {
    const redSocial = await this.findOne(id);
    redSocial.isDeleted = true;
    await this.redSocialRepo.save(redSocial);
  }
}