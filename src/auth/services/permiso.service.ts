import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryDto } from './../../common/dto/query.dto';
import { handlerError } from './../../common/utils/handlerError.utils';
import { CreatePermisoDTO, UpdatePermisoDTO } from './../dto';
import { ORDER_ENUM } from './../../common/constants';
import { PermisoEntity } from './../entities/permiso.entity';

@Injectable()
export class PermisoService {

    private readonly logger = new Logger('PermissionService');

    constructor(
        @InjectRepository(PermisoEntity) private readonly permisoRepository: Repository<PermisoEntity>,
    ) { }

    public async create(createPermiso: CreatePermisoDTO): Promise<PermisoEntity> {
        try {
            const { nombre, descripcion } = createPermiso;
            const permission = this.permisoRepository.create({ nombre, descripcion });
            const permissionCreated = await this.permisoRepository.save(permission);
            return permissionCreated;
        } catch (error) {
            handlerError(error, this.logger);
        }
    }

    public async findAll(queryDto: QueryDto): Promise<any> {
        try {
            const { limit, attr, value, offset, order = ORDER_ENUM.DESC } = queryDto;
            const query = this.permisoRepository.createQueryBuilder('permiso');
            if (attr && value) query.andWhere(`permiso.${attr} ILIKE :value`, { value: `%${value}%` });
            if (limit) query.take(limit);
            if (offset) query.skip(offset);
            if (order) query.orderBy('permiso.nombre', order.toLocaleUpperCase() as any);
            return {
                data: await query.getMany(),
                countData: await query.getCount(),
            };
        } catch (error) {
            handlerError(error, this.logger);
        }
    }

    public async findOne(id: string): Promise<PermisoEntity> {
        try {
            return await this.permisoRepository.findOne({ where: { id } });
        } catch (error) {
            handlerError(error, this.logger);
        }
    }

    public async findOneByName(nombre: string): Promise<PermisoEntity> {
        try {
            return await this.permisoRepository.findOne({ where: { nombre } });
        } catch (error) {
            handlerError(error, this.logger);
        }
    }

    public async update(id: string, updatePermisoDto: UpdatePermisoDTO): Promise<PermisoEntity> {
        try {
            const permiso = await this.findOne(id);
            if (!permiso) throw new NotFoundException('Permission not found');
            const permisoUpdated = await this.permisoRepository.update(id, updatePermisoDto);
            if (permisoUpdated.affected == 0) throw new Error('Error updating permission');
            return await this.findOne(id);
        } catch (error) {
            handlerError(error, this.logger);
        }
    }

    public async remove(id: string): Promise<any> {
        try {
            const permiso = await this.permisoRepository.findOne({ where: { id } });
            if (!permiso) throw new NotFoundException('permission not found');
            const permisoDeleted = await this.permisoRepository.delete(permiso);
            if (permisoDeleted.affected === 0) throw new Error('Error deleting permission');
            return {
                message: 'Permission deleted successfully',
                statusCode: 200
            };
        } catch (error) {
            handlerError(error, this.logger);
        }
    }
}
