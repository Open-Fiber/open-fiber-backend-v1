import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CuentaService } from './services/cuenta.service';
import { CuentaController } from './controllers/cuenta.controller';
import { CuentaEntity } from './entities/cuenta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CuentaEntity])
  ],
  providers: [CuentaService],
  controllers: [CuentaController],
  exports: [CuentaService, TypeOrmModule],
})
export class CuentaModule {}
