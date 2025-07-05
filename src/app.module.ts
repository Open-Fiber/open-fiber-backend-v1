import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { OrganizacionModule } from './modules/organizacion/organization.module';
import { ProyectoModule } from './modules/proyecto/proyecto.module';
import { MaquinaModule } from './modules/maquina/maquina.module';
import { ContribuyenteModule } from './modules/contribuyente/contribuyente.module';
import { HitoModule } from './modules/hitos/hito.module';
import { ContextoDeAplicacionModule } from './modules/contexto_de_aplicacion/contexto-de-aplicacion.module';
import { CasoDeUsoModule } from './modules/caso_de_uso/caso-de-uso.module';
import { TecnologiaModule } from './modules/tecnologia/tecnologia.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    AuthModule,
    CommonModule,
    OrganizacionModule,
    UsuarioModule,
    ProyectoModule,
    MaquinaModule,
    ContribuyenteModule,
    HitoModule,
    ContextoDeAplicacionModule,
    CasoDeUsoModule,
    TecnologiaModule
  ],
})
export class AppModule {}
