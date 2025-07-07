// src/modules/compartido/services/compartido.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompartidoEntity } from './../entities/compartido.entity';
import { CreateCompartidoDto } from './../dto/create-compartido.dto';
import { UpdateCompartidoDto } from './../dto/update-compartido.dto';
import { OrganizacionEntity } from './../../../modules/organizacion/entities/organizacion.entity';
import { MaquinaEntity } from './../../../modules/maquina/entities/maquina.entity';

@Injectable()
export class CompartidoService {
  constructor(
    @InjectRepository(CompartidoEntity)
    private readonly compartidoRepo: Repository<CompartidoEntity>,
    @InjectRepository(OrganizacionEntity)
    private readonly organizacionRepo: Repository<OrganizacionEntity>,
    @InjectRepository(MaquinaEntity)
    private readonly maquinaRepo: Repository<MaquinaEntity>,
  ) {}

  async create(dto: CreateCompartidoDto): Promise<CompartidoEntity> {
    const organizacion = await this.organizacionRepo.findOneBy({ id: dto.organizacionId });
    if (!organizacion) throw new NotFoundException('Organización no encontrada');

    const maquina = await this.maquinaRepo.findOneBy({ id: dto.maquinaId });
    if (!maquina) throw new NotFoundException('Máquina no encontrada');

    // Opcional: Evitar que una misma máquina sea compartida con la misma organización dos veces (o si ya está activa)
    const existingCompartido = await this.compartidoRepo.findOne({
      where: {
        organizacion: { id: dto.organizacionId },
        maquina: { id: dto.maquinaId },
        isDeleted: false,
        // Puedes añadir una condición sobre el 'estado' si solo permites un 'compartido activo' por pareja
        // estado: 'A',
      },
    });

    if (existingCompartido) {
      throw new ConflictException('Esta máquina ya está compartida con esta organización.');
    }

    const compartido = this.compartidoRepo.create({ ...dto, organizacion, maquina });
    return this.compartidoRepo.save(compartido);
  }

  async findAll(): Promise<CompartidoEntity[]> {
    return this.compartidoRepo.find({ where: { isDeleted: false }, relations: ['organizacion', 'maquina'] });
  }

  async findOne(id: string): Promise<CompartidoEntity> {
    const compartido = await this.compartidoRepo.findOne({ where: { id, isDeleted: false }, relations: ['organizacion', 'maquina'] });
    if (!compartido) throw new NotFoundException('Compartido no encontrado');
    return compartido;
  }

  async update(id: string, dto: UpdateCompartidoDto): Promise<CompartidoEntity> {
    const compartido = await this.findOne(id);
    
    // Si se intenta cambiar la organización o la máquina, verificar conflicto
    if ((dto.organizacionId && dto.organizacionId !== compartido.organizacion.id) || (dto.maquinaId && dto.maquinaId !== compartido.maquina.id)) {
        const newOrganizacion = dto.organizacionId ? await this.organizacionRepo.findOneBy({ id: dto.organizacionId }) : compartido.organizacion;
        if (dto.organizacionId && !newOrganizacion) throw new NotFoundException('Nueva organización no encontrada');

        const newMaquina = dto.maquinaId ? await this.maquinaRepo.findOneBy({ id: dto.maquinaId }) : compartido.maquina;
        if (dto.maquinaId && !newMaquina) throw new NotFoundException('Nueva máquina no encontrada');

        const existingConflict = await this.compartidoRepo.findOne({
            where: {
                organizacion: { id: newOrganizacion.id },
                maquina: { id: newMaquina.id },
                isDeleted: false,
            },
        });

        if (existingConflict && existingConflict.id !== id) {
            throw new ConflictException('La combinación de organización y máquina ya existe en otro compartido activo.');
        }

        if (dto.organizacionId) compartido.organizacion = newOrganizacion;
        if (dto.maquinaId) compartido.maquina = newMaquina;
    }

    Object.assign(compartido, dto); // Aplica otras propiedades como estado
    return this.compartidoRepo.save(compartido);
  }

  async softDelete(id: string): Promise<void> {
    const compartido = await this.findOne(id);
    compartido.isDeleted = true;
    await this.compartidoRepo.save(compartido);
  }
}