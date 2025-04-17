import { Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UsuarioEntity } from '../entities/usuario.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UsuarioService');

  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) { }
}
