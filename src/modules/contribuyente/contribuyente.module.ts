import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContribuyenteEntity } from './entities/contribuyente.entity';
import { MaquinaEntity } from '../maquina/entities/maquina.entity';
import { ContribuyenteService } from './services/contribuyente.service';
import { ContribuyenteController } from './controllers/contribuyente.controller';
import { CuentaModule } from '../cuenta/cuenta.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ContribuyenteEntity, MaquinaEntity]),
        forwardRef(() => CuentaModule),
    ],
    controllers: [ContribuyenteController],
    providers: [ContribuyenteService],
    exports: [TypeOrmModule, ContribuyenteService]
})
export class ContribuyenteModule { }