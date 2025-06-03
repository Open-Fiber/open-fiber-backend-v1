import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { OrganizacionModule } from './modules/organizacion/organization.module';
import { ProyectoModule } from './modules/proyecto/proyecto.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    AuthModule,
    CommonModule,
    OrganizacionModule,
    UsuarioModule,
    ProyectoModule,
  ],
})
export class AppModule {}
