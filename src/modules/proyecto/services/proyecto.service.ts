import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CuentaEntity } from './../../../modules/cuenta/entities/cuenta.entity';
import { CreateProyectoDto } from './../dto/create-proyecto.dto';
import { UpdateProyectoDto } from './../dto/update-proyecto.dto';
import { ProyectoEntity } from './../entities/proyecto.entity';
import { AuthGuard } from '../../../auth/guards/auth.guard';
import { PermisoGuard } from 'src/auth/guards';

@Injectable()
@UseGuards(AuthGuard, PermisoGuard)
export class ProyectoService {
  constructor(
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>,
    @InjectRepository(CuentaEntity)
    private readonly cuentaRepository: Repository<CuentaEntity>,
  ) {}

  async create(dto: CreateProyectoDto, idCuenta: string): Promise<ProyectoEntity> {
    const cuenta = await this.cuentaRepository.findOneBy({ id: idCuenta });
    if (!cuenta) {
      throw new NotFoundException('Cuenta no encontrada');
    }

    const proyecto = this.proyectoRepository.create({
      ...dto, creador: cuenta
    });

    return this.proyectoRepository.save(proyecto);
  }

  async findAll(): Promise<ProyectoEntity[]> {
    return this.proyectoRepository.find({
      where: { isDeleted: false },
    });
  }

  async findOne(id: string): Promise<ProyectoEntity> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }
    return proyecto;
  }

  async findByCuenta(cuentaId: string): Promise<ProyectoEntity[]> {
    return this.proyectoRepository.find({
      where: {
        creador: { id: cuentaId },
        isDeleted: false,
      },
    });
  }

  async update(id: string, dto: UpdateProyectoDto): Promise<ProyectoEntity> {
    const proyecto = await this.findOne(id);
    Object.assign(proyecto, dto);
    return this.proyectoRepository.save(proyecto);
  }

  async softDelete(id: string): Promise<void> {
    const proyecto = await this.findOne(id);
    proyecto.isDeleted = true;
    await this.proyectoRepository.save(proyecto);
  }
}
