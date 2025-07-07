import { Module } from '@nestjs/common';
import { CuentaModule } from './../modules/cuenta/cuenta.module';
import { RegistrarController } from './controllers/register.controller';

@Module({
    imports: [
        CuentaModule
    ],
    controllers: [RegistrarController],
})
export class CommonModule { }
