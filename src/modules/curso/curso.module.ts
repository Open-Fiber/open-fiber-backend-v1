// src/modules/curso/curso.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoEntity } from './entities/curso.entity';
import { CuentaEntity } from './../cuenta/entities/cuenta.entity'; // ¡Asegúrate de importar CuentaEntity aquí!
import { CursoService } from './services/curso.service';
import { CursoController } from './controllers/curso.controller';
import { CuentaModule } from './../cuenta/cuenta.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CursoEntity, CuentaEntity]),
        forwardRef(() => CuentaModule),
    ],
    controllers: [CursoController],
    providers: [CursoService],
    exports: [TypeOrmModule, CursoService]
})
export class CursoModule { }