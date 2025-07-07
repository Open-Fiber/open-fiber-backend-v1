import { Global, Module } from '@nestjs/common';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { CuentaService } from './../modules/cuenta/services/cuenta.service';
import { CuentaModule } from './../modules/cuenta/cuenta.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './services/implementacion/jwt.strategy.service';
import { TokenValidatorService } from './services/token-validator.service';
import { ITokenStrategy } from './services/token-strategy.service';
import { JwtServiceAdapter } from './services/jwt.service';
import { PermisoController } from './controllers/permiso.controller';
import { RolController } from './controllers/rol.controller';
import { RolService } from './services/rol.service';
import { PermisoService } from './services/permiso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisoEntity } from './entities/permiso.entity';
import { RolEntity } from './entities/rol.entity';
import { UniquePermissionConstraint, UniqueRoleConstraint } from './validations';
import { PermisoRolEntity } from './entities/permiso-rol.entity';
import { PermisoRolService } from './services/permission-role.service';
import { UsuarioModule } from './../modules/usuario/usuario.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([PermisoEntity, RolEntity, PermisoRolEntity]),
    CuentaModule, 
    UsuarioModule,
    ConfigModule
  ],
  providers: [
    {
      provide: 'ITokenStrategy',
      useClass: JwtStrategy, // Estrategia en uso para la validacion del token
    },
    {
      provide: TokenValidatorService,
      useFactory: (strategy: ITokenStrategy) => new TokenValidatorService(strategy),
      inject: ['ITokenStrategy'],
    },
    AuthService,
    RolService,
    PermisoRolService,
    PermisoService,
    CuentaService,
    UniqueRoleConstraint,
    UniquePermissionConstraint,
    JwtServiceAdapter,
  ],
  exports: [RolService, PermisoService, PermisoRolService],
  controllers: [AuthController, PermisoController, RolController],
})
export class AuthModule { }