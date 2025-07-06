// src/modules/recurso/recurso.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecursoEntity } from './entities/recurso.entity';
import { MaquinaEntity } from './../maquina/entities/maquina.entity';
import { RecursoService } from './services/recurso.service';
import { RecursoController } from './controllers/recurso.controller';
import { CuentaModule } from './../cuenta/cuenta.module'; 

@Module({
    imports: [
        TypeOrmModule.forFeature([RecursoEntity, MaquinaEntity]),
        forwardRef(() => CuentaModule),
    ],
    controllers: [RecursoController],
    providers: [RecursoService],
    exports: [TypeOrmModule, RecursoService]
})
export class RecursoModule { }