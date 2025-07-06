import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { CuentaModule } from './../cuenta/cuenta.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity]),
    forwardRef(() => CuentaModule),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports:[ TypeOrmModule, UsuarioService ]
})
export class UsuarioModule {}
