// src/modules/recurso-clase/recurso-clase.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecursoClaseEntity } from './entities/recurso-clase.entity';
import { ClaseEntity } from '../clase/entities/clase.entity'; // ¡Asegúrate de importar ClaseEntity aquí!
import { RecursoClaseService } from './services/recurso-clase.service';
import { RecursoClaseController } from './controllers/recurso-clase.controller';
import { ClaseModule } from '../clase/clase.module'; // Dependencia a ClaseModule
import { CuentaModule } from '../cuenta/cuenta.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RecursoClaseEntity, ClaseEntity]),
        // Es importante que ClaseModule esté importado en el forwardRef si hay dependencias circulares.
        forwardRef(() => CuentaModule),
    ],
    controllers: [RecursoClaseController],
    providers: [RecursoClaseService],
    exports: [TypeOrmModule, RecursoClaseService]
})
export class RecursoClaseModule { }