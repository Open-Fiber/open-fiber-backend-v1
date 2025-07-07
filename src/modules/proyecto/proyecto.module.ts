import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoService } from './services/proyecto.service';
import { ProyectoController } from './controller/proyecto.controller';
import { ProyectoEntity } from './entities/proyecto.entity';
import { CuentaModule } from './../cuenta/cuenta.module';
import { AuthModule } from './../../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProyectoEntity]),
    CuentaModule,
    AuthModule,
  ],
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports: [TypeOrmModule, ProyectoService]
})
export class ProyectoModule {}
