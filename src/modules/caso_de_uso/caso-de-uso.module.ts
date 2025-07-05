// src/modules/caso-de-uso/caso-de-uso.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasoDeUsoEntity } from './entities/caso-de-uso.entity';
import { MaquinaEntity } from '../maquina/entities/maquina.entity';
import { CasoDeUsoService } from './services/caso-de-uso.service';
import { CasoDeUsoController } from './controllers/caso-de-uso.controller';
import { CuentaModule } from '../cuenta/cuenta.module'; // Asumiendo que CuentaModule es una dependencia común

@Module({
    imports: [
        TypeOrmModule.forFeature([CasoDeUsoEntity, MaquinaEntity]),
        forwardRef(() => CuentaModule),
    ],
    controllers: [CasoDeUsoController],
    providers: [CasoDeUsoService],
    exports: [TypeOrmModule, CasoDeUsoService]
})
export class CasoDeUsoModule { }