// src/modules/tecnologia/tecnologia.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TecnologiaEntity } from './entities/tecnologia.entity';
import { MaquinaEntity } from './../maquina/entities/maquina.entity';
import { TecnologiaService } from './services/tecnologia.service';
import { TecnologiaController } from './controllers/tecnologia.controller';
import { CuentaModule } from './../cuenta/cuenta.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TecnologiaEntity, MaquinaEntity]),
        forwardRef(() => CuentaModule),
    ],
    controllers: [TecnologiaController],
    providers: [TecnologiaService],
    exports: [TypeOrmModule, TecnologiaService]
})
export class TecnologiaModule { }