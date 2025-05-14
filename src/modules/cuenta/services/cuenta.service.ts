import { Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateCuentaDto, CuentaDTO } from '../dto/';
import { CuentaEntity } from '../entities/cuenta.entity';
import { handlerError } from '../../../common/utils/handlerError.utils';
import { QueryDto } from '../../../common/dto/query.dto';
import { ResponseMessage } from '../../../common/interfaces/responseMessage.interface';
import { CuentaResponseDTO } from '../dto/cuentaResponse.dto';

@Injectable()
export class CuentaService {
  private readonly logger = new Logger('CuentaService');

  constructor(
    @InjectRepository(CuentaEntity)
    private readonly cuentaRepository: Repository<CuentaEntity>,
  ) { }

  public async findAll(queryDto: QueryDto): Promise<CuentaDTO[]> {
    try {
      const { limit, offset, order, attr, value } = queryDto;
      const query = this.cuentaRepository.createQueryBuilder('cuenta');
      if (limit) query.take(limit);
      if (offset) query.skip(offset);
      if (order) query.orderBy('cuenta.createdAt', order.toLocaleUpperCase() as any);
      if (attr && value) query.where(`cuenta.${attr} ILIKE :value`, { value: `%${value}%` });
      const cuentas = await query.getMany();
      return cuentas.map( cuenta => new CuentaDTO(cuenta))
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async createCuenta(createCuentaDto: CreateCuentaDto): Promise<CuentaResponseDTO> {
    try {
      createCuentaDto.password = await this.encryptPassword(createCuentaDto.password);
      const {...createCuenta} = createCuentaDto;
      await this.cuentaRepository.save(createCuenta);
      return this.findOneBy({ key: 'email', value: createCuenta.email }); 
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOne(id: string): Promise<CuentaDTO> {
    try {
      const cuenta: CuentaEntity = await this.cuentaRepository.findOne({ where: { id } });
      if (!cuenta) throw new NotFoundException('Cuenta no encontrada.');
      return new CuentaDTO(cuenta);
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findByEmail(email: string): Promise<CuentaEntity> {
    try {
      const cuenta: CuentaEntity = await this.cuentaRepository.findOne({ where: { email:email } });
      if (!cuenta) throw new NotFoundException('Cuenta no encontrada.');
      return cuenta;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async cambiarEstadoCuenta(id: string): Promise<any> {
    try {
      const cuenta: CuentaDTO = await this.findOne(id);
      const estadoAnterior = cuenta.isActive;
      const cuentaUpdated = await this.cuentaRepository.update(cuenta.id, {isActive: !cuenta.isActive});
      if (cuentaUpdated.affected === 0) throw new NotFoundException('Cuenta no actualizada.');
      return estadoAnterior ? { mensaje: 'Cuenta Desactivada'}: { mensaje: 'Cuenta Activada' };
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async delete(id: string): Promise<ResponseMessage> {
    try {
      const user = await this.findOne(id);
      const deletedUser = await this.cuentaRepository.delete(user.id);
      if (deletedUser.affected === 0) throw new BadRequestException('Cuenta no eliminada.');
      return { statusCode: 200, message: 'Cuenta eliminada.' };
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOneByAdmin({ key, value, }: { key: keyof CreateCuentaDto; value: any; }): Promise<CuentaDTO> {
    try {
      const cuenta: CuentaEntity = await this.cuentaRepository.findOne({ where: { [key]: value } });
      if (!cuenta) throw new NotFoundException('Cuenta no encontrada.');
      return new CuentaDTO(cuenta);
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOneBy({ key, value, }: { key: keyof CreateCuentaDto; value: any; }): Promise<CuentaResponseDTO> {
    try {
      const cuenta: CuentaEntity = await this.cuentaRepository.findOne({ where: { [key]: value } });
      if (!cuenta) throw new NotFoundException('Cuenta no encontrada.');
      return new CuentaResponseDTO(cuenta);
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOneAuth(id: string): Promise<CuentaEntity> {
    try {
      const cuenta: CuentaEntity = await this.cuentaRepository.findOne({ where: { id }, });
      if (!cuenta) throw new UnauthorizedException('Cuenta asociada al token no encontrada.',);
      return cuenta;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  private async encryptPassword(password: string): Promise<string> {
    return bcrypt.hashSync(password, + process.env.HASH_SALT);
  }
}
