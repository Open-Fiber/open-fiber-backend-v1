// src/modules/red-social/red-social.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialEntity } from './entities/red-social.entity';
import { RedSocialService } from './services/red-social.service';
import { RedSocialController } from './controllers/red-social.controller';
import { CuentaModule } from './../cuenta/cuenta.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RedSocialEntity]),
        forwardRef(() => CuentaModule),
    ],
    controllers: [RedSocialController],
    providers: [RedSocialService],
    exports: [TypeOrmModule, RedSocialService]
})
export class RedSocialModule { }