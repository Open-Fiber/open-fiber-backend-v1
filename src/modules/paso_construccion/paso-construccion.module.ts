// src/modules/paso-construccion/paso-construccion.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasoConstruccionEntity } from './entities/paso-construccion.entity';
import { MaquinaEntity } from '../maquina/entities/maquina.entity';
import { PasoConstruccionService } from './services/paso-construccion.service';
import { PasoConstruccionController } from './controllers/paso-construccion.controller';
import { CuentaModule } from '../cuenta/cuenta.module'; // Asumiendo que CuentaModule es una dependencia común

@Module({
    imports: [
        TypeOrmModule.forFeature([PasoConstruccionEntity, MaquinaEntity]),
        forwardRef(() => CuentaModule),
    ],
    controllers: [PasoConstruccionController],
    providers: [PasoConstruccionService],
    exports: [TypeOrmModule, PasoConstruccionService]
})
export class PasoConstruccionModule { }