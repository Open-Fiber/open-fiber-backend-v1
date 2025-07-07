import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizacionEntity } from './entities/organizacion.entity';
import { CuentaModule } from './../cuenta/cuenta.module';
import { OrganizacionService } from './services/organizacion.service';
import { OrganizacionController } from './controllers/organizacion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizacionEntity]),
    CuentaModule
  ],
  controllers: [OrganizacionController],
  providers: [OrganizacionService],
  exports:[ TypeOrmModule, OrganizacionService ]
})
export class OrganizacionModule {}
