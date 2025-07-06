// src/modules/compartido/compartido.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompartidoEntity } from './entities/compartido.entity';
import { OrganizacionEntity } from '../organizacion/entities/organizacion.entity';
import { MaquinaEntity } from '../maquina/entities/maquina.entity';
import { CompartidoService } from './services/compartido.service';
import { CompartidoController } from './controllers/compartido.controller';
import { CuentaModule } from '../cuenta/cuenta.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CompartidoEntity, OrganizacionEntity, MaquinaEntity]),
        // Se usan forwardRef si hay dependencias circulares, o simplemente como importación.
        forwardRef(() => CuentaModule),
    ],
    controllers: [CompartidoController],
    providers: [CompartidoService],
    exports: [TypeOrmModule, CompartidoService]
})
export class CompartidoModule { }