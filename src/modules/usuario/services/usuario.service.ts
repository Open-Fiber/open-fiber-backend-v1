import { forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../entities/usuario.entity';
import { CreateUsuarioDto, UpdateUsuarioDto, UsuarioDto } from '../dto/';
import { CuentaService } from 'src/modules/cuenta/services/cuenta.service';
import { handlerError } from 'src/common/utils/handlerError.utils';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger('UsuarioService');

  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @Inject(forwardRef(()=>CuentaService))
    private readonly cuentaService: CuentaService,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioDto> {
    try {
      const cuenta = await this.cuentaService.findOne(createUsuarioDto.cuentaId);
      if ( createUsuarioDto.fechaNacimiento ) createUsuarioDto.fechaNacimiento = new Date(createUsuarioDto.fechaNacimiento)

      const usuario = this.usuarioRepository.create({
        ...createUsuarioDto,
        cuenta: { id: cuenta.id }
      });

      const savedUsuario = await this.usuarioRepository.save(usuario);
      return new UsuarioDto(savedUsuario);
    } catch (error) {
      handlerError(error, this.logger);
    }

  }

  async findAll(): Promise<UsuarioDto[]> {
    try {
      const usuarios = await this.usuarioRepository.find({
        relations: ['cuenta', 'rol']
      });
      console.log(usuarios)
      return usuarios.map(usuario => new UsuarioDto(usuario));
    } catch (error) {
      handlerError(error, this.logger);
    }

  }

  async findOne(id: string): Promise<UsuarioDto> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id },
        relations: ['cuenta', 'rol']
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      return new UsuarioDto(usuario);
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  async findUsuarioByCuenta(id: string): Promise<UsuarioDto> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { cuenta: { id } }, relations: ['rol']
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      return new UsuarioDto(usuario);
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioDto> {
    try {
      const usuario = await this.findOne(id);
      const usuarioUpdated = await this.usuarioRepository.update(usuario.id, updateUsuarioDto);
      if (usuarioUpdated.affected === 0) throw new NotFoundException('Usuario no actualizado.');
      return await this.findOne(id);
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  async updateRol(id: string, rolId: string ): Promise<UsuarioDto> {
    try {
      const usuario = await this.findOne(id);
      const usuarioUpdated = await this.usuarioRepository.update(usuario.id, { rol: { id: rolId}});
      if (usuarioUpdated.affected === 0) throw new NotFoundException('Usuario no actualizado.');
      return await this.findOne(id);
    } catch (error) {
      handlerError(error, this.logger);
    }
  }
}