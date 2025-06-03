import { Module } from '@nestjs/common';

import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { UsuarioModule } from 'src/modules/usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeederModule { }
