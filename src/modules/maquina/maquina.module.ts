import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaquinaController } from './controllers/maquina.controller';
import { MaquinaService } from './services/maquina.service';
import { MaquinaEntity } from './entities/maquina.entity';
import { ProyectoEntity } from 'src/modules/proyecto/entities/proyecto.entity';
import { CuentaModule } from '../cuenta/cuenta.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([MaquinaEntity, ProyectoEntity]),
        forwardRef(() => CuentaModule),
    ],
    controllers: [MaquinaController],
    providers: [MaquinaService],
    exports:[ TypeOrmModule, MaquinaService ]
})
export class MaquinaModule { }
