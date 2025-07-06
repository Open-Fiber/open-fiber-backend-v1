// src/modules/comentario/comentario.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComentarioEntity } from './entities/comentario.entity';
import { CuentaEntity } from './../cuenta/entities/cuenta.entity'; // ¡Asegúrate de importar CuentaEntity aquí!
import { ClaseEntity } from './../clase/entities/clase.entity'; // ¡Asegúrate de importar ClaseEntity aquí!
import { ComentarioService } from './services/comentario.service';
import { ComentarioController } from './controllers/comentario.controller';
import { CuentaModule } from './../cuenta/cuenta.module';
import { ClaseModule } from './../clase/clase.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ComentarioEntity, CuentaEntity, ClaseEntity]),
        // Es importante que CuentaModule y ClaseModule estén importados en el forwardRef
        // si hay dependencias circulares, o simplemente como importación si no.
        forwardRef(() => CuentaModule),
        forwardRef(() => ClaseModule),
    ],
    controllers: [ComentarioController],
    providers: [ComentarioService],
    exports: [TypeOrmModule, ComentarioService]
})
export class ComentarioModule { }