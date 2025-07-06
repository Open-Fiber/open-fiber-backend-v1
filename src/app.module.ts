import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { OrganizacionModule } from './modules/organizacion/organizacion.module';
import { ProyectoModule } from './modules/proyecto/proyecto.module';
import { MaquinaModule } from './modules/maquina/maquina.module';
import { ContribuyenteModule } from './modules/contribuyente/contribuyente.module';
import { HitoModule } from './modules/hitos/hito.module';
import { ContextoDeAplicacionModule } from './modules/contexto_de_aplicacion/contexto-de-aplicacion.module';
import { CasoDeUsoModule } from './modules/caso_de_uso/caso-de-uso.module';
import { TecnologiaModule } from './modules/tecnologia/tecnologia.module';
import { LikeModule } from './modules/like/like.module';
import { CursoModule } from './modules/curso/curso.module';
import { ClaseModule } from './modules/clase/clase.module';
import { ComentarioModule } from './modules/comentario/comentario.module';
import { RecursoClaseModule } from './modules/recurso_clase/recurso-clase.module';
import { RedSocialModule } from './modules/red_social/red_social.module';
import { MiembroModule } from './modules/miembro/miembro.module';
import { CompartidoModule } from './modules/compartido/compartido.module';

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
    TecnologiaModule,
    LikeModule,
    CursoModule,
    ClaseModule,
    RecursoClaseModule,
    ComentarioModule,
    RedSocialModule,
    MiembroModule,
    CompartidoModule
  ],
})
export class AppModule {}
