import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CuentaService } from './services/cuenta.service';
import { CuentaController } from './controllers/cuenta.controller';
import { CuentaEntity } from './entities/cuenta.entity';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CuentaEntity]),
    forwardRef(() => UsuarioModule)
  ],
  providers: [CuentaService],
  controllers: [CuentaController],
  exports: [CuentaService, TypeOrmModule],
})
export class CuentaModule {}
