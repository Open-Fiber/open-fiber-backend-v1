import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { handlerError } from '../../common/utils/handlerError.utils';
import { CreatePermisoRolDto } from '../dto';
import { PermisoRolEntity } from './../entities/permiso-rol.entity';
import { PermisoService } from './permiso.service';

@Injectable()
export class PermisoRolService {

    private readonly logger = new Logger('PermisoRolService');

    constructor(
        @InjectRepository(PermisoRolEntity) private readonly permisoRolRepository: Repository<PermisoRolEntity>,
        private readonly permisoService: PermisoService
    ) { }

    public async create(createPermisoRolDto: CreatePermisoRolDto): Promise<PermisoRolEntity> {
        try {
            const { permiso, rol } = createPermisoRolDto;
            const permisoEntity = await this.permisoService.findOne(permiso);
            if (!permisoEntity) throw new NotFoundException('Permission not found');
            const permisoRolCreated = this.permisoRolRepository.create({ permiso: { id: permiso }, rol: { id: rol } });
            this.permisoRolRepository.save(permisoRolCreated);
            return permisoRolCreated;
        } catch (error) {
            handlerError(error, this.logger);
        }
    }

    public async remove(id: string): Promise<any> {
        try {
            const permissionRole = await this.permisoRolRepository.findOne({ where: { id } });
            if (!permissionRole) throw new NotFoundException('permission-role not found');
            const permissionRoleDeleted = await this.permisoRolRepository.delete(permissionRole);
            if (permissionRoleDeleted.affected === 0) throw new Error('Error deleting permission-role');
            return {
                message: 'Permission-role deleted successfully',
                statusCode: 200
            };
        } catch (error) {
            handlerError(error, this.logger);
        }
    }

    public async getPermisosOfRol(rolId: string): Promise<PermisoRolEntity[]> {
        try {
            const query = this.permisoRolRepository.createQueryBuilder('permissionRole')
                .leftJoinAndSelect('permissionRole.permiso', 'permiso')
                .where('permissionRole.rol.id = :rolId', { rolId });
            return await query.getMany();
        } catch (error) {
            handlerError(error, this.logger);
        }
    }
}
