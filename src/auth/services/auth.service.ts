import { Injectable, Logger } from '@nestjs/common';
import { NotFoundException, } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';

import { CuentaEntity } from './../../modules/cuenta/entities/cuenta.entity';
import { CuentaService } from './../../modules/cuenta/services/cuenta.service';
import { IPayload } from './../interfaces/payload.interface';
import { ILoginResponse } from './../interfaces/login.interface';
import { handlerError } from './../../common/utils/handlerError.utils';
import { TokenValidatorService } from './token-validator.service';
import { JwtServiceAdapter } from './jwt.service';
import { IAuthToken } from './../interfaces/authToken.interface';
import { CuentaResponseDTO } from '../../modules/cuenta/dto/cuentaResponse.dto';
import { TIPO_CUENTA } from '../../common/constants/tipoCuenta';
import { UsuarioService } from '../../modules/usuario/services/usuario.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly cuentaService: CuentaService,
    private readonly usuarioService: UsuarioService,
    private readonly tokenValidator: TokenValidatorService,
    private readonly jwtService: JwtServiceAdapter
  ) {}

  async login(email: string, password: string): Promise<ILoginResponse> {
    try {
      const cuenta = await this.cuentaService.findByEmail(email);
      if (!cuenta) throw new NotFoundException('Usuario o contraseña incorrecta.');
      if (cuenta.isDeleted || !cuenta.isActive) throw new NotFoundException('Ocurrió un problema.');
      
      const isMatch = await bcrypt.compare(password, cuenta.password);
      if (!isMatch) throw new NotFoundException('Usuario o contraseña incorrecta.');

      return this.generateJWT(cuenta);
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  async checkToken(token: string): Promise<IAuthToken | false> {
    try {
      const userToken = await this.tokenValidator.validateToken(token);
      if (!userToken) return false;
      return userToken;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  async generateJWT(cuenta: any): Promise<ILoginResponse> {
    const payload = await this.getPayload(cuenta);
    const accessToken = this.jwtService.signToken(payload);
    const cuentaData = new CuentaResponseDTO(cuenta);
    return { accessToken, dataCuenta: cuentaData };
  }

  async recoverPassword(email: string): Promise<{ accessToken: string }> {
    const user = await this.cuentaService.findByEmail(email);
    const payload = await this.getPayload(user);
    const accessToken = this.jwtService.signToken(payload);
    return { accessToken };
  }

  private async getPayload(cuenta: CuentaEntity): Promise<IPayload> {
    const usuario = await this.usuarioService.findUsuarioByCuenta(cuenta.id);
      console.log(usuario);
    let payload: IPayload = { sub: cuenta.id, tipo: cuenta.tipo }
    if( cuenta.tipo === TIPO_CUENTA.USER){
      payload.rol = usuario.rol;
    }
    return payload;
  }
}