// src/modules/miembro/miembro.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiembroEntity } from './entities/miembro.entity';
import { UsuarioEntity } from '../usuario/entities/usuario.entity'; // ¡Asegúrate de importar UsuarioEntity aquí!
import { OrganizacionEntity } from '../organizacion/entities/organizacion.entity'; // ¡Asegúrate de importar OrganizacionEntity aquí!
import { MiembroService } from './services/miembro.service';
import { MiembroController } from './controllers/miembro.controller';
import { UsuarioModule } from '../usuario/usuario.module'; // Asumo que tienes UsuarioModule
import { OrganizacionModule } from '../organizacion/organizacion.module'; // Asumo que tienes OrganizacionModule

@Module({
    imports: [
        TypeOrmModule.forFeature([MiembroEntity, UsuarioEntity, OrganizacionEntity]),
        // Se usan forwardRef si hay dependencias circulares, o simplemente como importación.
        forwardRef(() => UsuarioModule),
        forwardRef(() => OrganizacionModule),
    ],
    controllers: [MiembroController],
    providers: [MiembroService],
    exports: [TypeOrmModule, MiembroService]
})
export class MiembroModule { }