// src/modules/contexto-de-aplicacion/contexto-de-aplicacion.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContextoDeAplicacionEntity } from './entities/contexto-de-aplicacion.entity';
import { MaquinaEntity } from '../maquina/entities/maquina.entity';
import { ContextoDeAplicacionService } from './services/contexto-de-aplicacion.service';
import { ContextoDeAplicacionController } from './controllers/contexto-de-aplicacion.controller';
import { CuentaModule } from '../cuenta/cuenta.module'; // Asumiendo que CuentaModule es una dependencia común

@Module({
    imports: [
        TypeOrmModule.forFeature([ContextoDeAplicacionEntity, MaquinaEntity]),
        forwardRef(() => CuentaModule),
    ],
    controllers: [ContextoDeAplicacionController],
    providers: [ContextoDeAplicacionService],
    exports: [TypeOrmModule, ContextoDeAplicacionService]
})
export class ContextoDeAplicacionModule { }