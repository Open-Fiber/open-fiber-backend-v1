import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { QueryDto } from './../../common/dto/query.dto';
import { handlerError } from './../../common/utils/handlerError.utils';
import { RolEntity } from './../entities/rol.entity';
import { ORDER_ENUM } from './../../common/constants';
import { PermisoEntity } from './../entities/permiso.entity';
import { CreateRolDTO, UpdateRolDTO } from './../dto';
import { PermisoRolEntity } from './../entities/permiso-rol.entity';

@Injectable()
export class RolService {

  private readonly logger = new Logger('RoleService');

  constructor(
    @InjectRepository(RolEntity) private readonly roleRepository: Repository<RolEntity>,
    @InjectRepository(PermisoRolEntity) private readonly permisoRolRepository: Repository<PermisoRolEntity>,
    @InjectRepository(PermisoEntity) private readonly permisoRepository: Repository<PermisoEntity>,
    private readonly dataSources: DataSource
  ) { }

  public async create(createRolDto: CreateRolDTO): Promise<RolEntity> {
    try {
      const { nombre, permisos } = createRolDto;

      const roles = await this.roleRepository.find({ relations: ['permisos'] });
      for (const role of roles) {
        const rolePermisos = role.permisos.map(permisoRol => permisoRol.id).sort();
        const newPermisos = permisos.slice().sort();

        if (JSON.stringify(rolePermisos) === JSON.stringify(newPermisos)) {
          throw new ConflictException('Ya existe un rol con los mismos permisos');
        }
      }

      const queryRunner = this.dataSources.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const roleCreated = this.roleRepository.create({ nombre });
        await queryRunner.manager.save(roleCreated);

        const promises = permisos.map(permiso => {
          const permisoFind = this.permisoRepository.findOne({ where: { id: permiso } });
          if (!permisoFind) throw new NotFoundException('Permission not found');
          const permissionRole = this.permisoRolRepository.create({ rol: { id: roleCreated.id }, permiso: { id: permiso } });
          return queryRunner.manager.save(permissionRole);
        });

        await Promise.all(promises);
        await queryRunner.commitTransaction();

        return roleCreated;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException(error.message);
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findAll(queryDto: QueryDto): Promise<any> {
    try {
      const { limit, attr, value, offset, order = ORDER_ENUM.DESC } = queryDto;
      const query = this.roleRepository.createQueryBuilder('rol');
      query.leftJoinAndSelect('rol.permisos', 'permisos');
      query.leftJoinAndSelect('permisos.permiso', 'permiso');
      if (attr && value) query.andWhere(`rol.${attr} LIKE :value`, { value: `%${value}%` });
      if (limit) query.take(limit);
      if (offset) query.skip(offset);
      if (order) query.orderBy('rol.nombre', order.toLocaleUpperCase() as any);
      return {
        data: await query.getMany(),
        countData: await query.getCount(),
      };
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOne(id: string): Promise<RolEntity> {
    try {
      return await this.roleRepository.findOne({ where: { id }, relations: ['permisos', 'permisos.permiso'] });
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async exists(id: string): Promise<RolEntity> {
    try {
      return await this.roleRepository.findOne({ where: { id } });
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOneByName(nombre: string): Promise<RolEntity> {
    try {
      const rol = await this.roleRepository.findOne({ where: { nombre } });
      return rol;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async update(id: string, updateRolDto: UpdateRolDTO): Promise<RolEntity> {
    try {
      const rol = await this.roleRepository.findOne({ where: { id } });
      if (!rol) throw new NotFoundException('Role not found');
      const { nombre, permisos } = updateRolDto;
      const queryRunner = this.dataSources.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
         queryRunner.manager.delete(PermisoRolEntity, { rol: { id: rol.id } });
        if (nombre) queryRunner.manager.update(RolEntity, { id: rol.id }, { nombre });
        const promises = permisos.map(permiso => {
          const permissionFind = this.permisoRepository.findOne({ where: { id: permiso } });
          if (!permissionFind) throw new NotFoundException('Permission not found');
          const permissionRole = this.permisoRolRepository.create({ rol: { id: rol.id }, permiso: { id: permiso } });
          return queryRunner.manager.save(permissionRole);
        });
        await Promise.all(promises);
        await queryRunner.commitTransaction();
        return await this.findOne(id);
      }
      catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException(error.message);
      }
      finally {
        await queryRunner.release();
      }
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async remove(id: string): Promise<any> {
    try {
      const role = await this.roleRepository.findOne({ where: { id } });
      if (!role) throw new NotFoundException('Role not found');
      const roleDeleted = await this.roleRepository.delete(role.id);
      if (roleDeleted.affected === 0) throw new Error('Error deleting role');
      return {
        message: 'Role deleted successfully',
        statusCode: 200
      };
    } catch (error) {
      handlerError(error, this.logger);
    }
  }
}
