// src/modules/like/like.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';
import { MaquinaEntity } from '../maquina/entities/maquina.entity';
import { CuentaEntity } from '../cuenta/entities/cuenta.entity'; // ¡Asegúrate de importar CuentaEntity aquí!
import { LikeService } from './services/like.service';
import { LikeController } from './controllers/like.controller';
import { CuentaModule } from '../cuenta/cuenta.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([LikeEntity, MaquinaEntity, CuentaEntity]),
        forwardRef(() => CuentaModule),
    ],
    controllers: [LikeController],
    providers: [LikeService],
    exports: [TypeOrmModule, LikeService]
})
export class LikeModule { }