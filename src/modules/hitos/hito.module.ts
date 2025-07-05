// src/modules/hito/hito.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HitoEntity } from './entities/hito.entity';
import { MaquinaEntity } from '../maquina/entities/maquina.entity';
import { HitoService } from './services/hito.service';
import { HitoController } from './controllers/hito.controller';
import { CuentaModule } from '../cuenta/cuenta.module'; // Asumiendo que CuentaModule es una dependencia común

@Module({
    imports: [
        TypeOrmModule.forFeature([HitoEntity, MaquinaEntity]),
        forwardRef(() => CuentaModule),
    ],
    controllers: [HitoController],
    providers: [HitoService],
    exports: [TypeOrmModule, HitoService]
})
export class HitoModule { }