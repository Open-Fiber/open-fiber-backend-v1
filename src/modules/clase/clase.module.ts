// src/modules/clase/clase.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseEntity } from './entities/clase.entity';
import { CursoEntity } from './../curso/entities/curso.entity'; // ¡Asegúrate de importar CursoEntity aquí!
import { ClaseService } from './services/clase.service';
import { ClaseController } from './controllers/clase.controller';
import { CuentaModule } from './../cuenta/cuenta.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClaseEntity, CursoEntity]),
        forwardRef(() => CuentaModule),
    ],
    controllers: [ClaseController],
    providers: [ClaseService],
    exports: [TypeOrmModule, ClaseService]
})
export class ClaseModule { }