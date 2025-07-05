import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaquinaEntity } from '../entities/maquina.entity';
import { CreateMaquinaDto } from '../dto/create-maquina.dto';
import { UpdateMaquinaDto } from '../dto/update-maquina.dto';
import { ProyectoEntity } from 'src/modules/proyecto/entities/proyecto.entity';

@Injectable()
export class MaquinaService {
    constructor(
        @InjectRepository(MaquinaEntity)
        private readonly maquinaRepository: Repository<MaquinaEntity>,
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>,
    ) { }

    async create(dto: CreateMaquinaDto): Promise<MaquinaEntity> {
        const proyecto = await this.proyectoRepository.findOneBy({ id: dto.proyectoId });
        if (!proyecto) {
            throw new NotFoundException('Proyecto no encontrado');
        }
        let maquinaOriginal = null;
        if (dto.maquinaOriginalId) {
            maquinaOriginal = await this.maquinaRepository.findOneBy({ id: dto.maquinaOriginalId });
            if (!maquinaOriginal) {
                throw new NotFoundException('Máquina original no encontrada');
            }
        }
        const maquina = this.maquinaRepository.create({ ...dto, proyecto, maquinaOriginal });

        return this.maquinaRepository.save(maquina);
    }

    async findAll(): Promise<MaquinaEntity[]> {
        return this.maquinaRepository.find({ where: { isDeleted: false } });
    }

    async findOne(id: string): Promise<MaquinaEntity> {
        const maquina = await this.maquinaRepository.findOne({ where: { id, isDeleted: false } });
        if (!maquina) {
            throw new NotFoundException('Máquina no encontrada');
        }
        return maquina;
    }

    async findByProyecto(proyectoId: string): Promise<MaquinaEntity[]> {
        return this.maquinaRepository.find({
            where: {
                proyecto: { id: proyectoId },
                isDeleted: false,
            },
        });
    }

    async update(id: string, dto: UpdateMaquinaDto): Promise<MaquinaEntity> {
        const maquina = await this.findOne(id);
        Object.assign(maquina, dto);
        if (dto.proyectoId) {
            const proyecto = await this.proyectoRepository.findOneBy({ id: dto.proyectoId });
            if (!proyecto) throw new NotFoundException('Proyecto no encontrado');
            maquina.proyecto = proyecto;
        }
        
        if (dto.maquinaOriginalId !== undefined) {
            if (dto.maquinaOriginalId === null) {
                maquina.maquinaOriginal = null;
            } else {
                const original = await this.maquinaRepository.findOneBy({ id: dto.maquinaOriginalId });
                if (!original) throw new NotFoundException('Máquina original no encontrada');
                maquina.maquinaOriginal = original;
            }
        }

        return this.maquinaRepository.save(maquina);
    }

    async softDelete(id: string): Promise<void> {
        const maquina = await this.findOne(id);
        maquina.isDeleted = true;
        await this.maquinaRepository.save(maquina);
    }
}
