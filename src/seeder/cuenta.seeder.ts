import { Injectable, Logger } from '@nestjs/common';
import { CuentaService } from '../modules/cuenta/services/cuenta.service';
import { CreateCuentaDto } from '../modules/cuenta/dto';
import { TIPO_CUENTA } from '../common/constants/tipoCuenta';
import { handlerError } from '../common/utils/handlerError.utils';

@Injectable()
export class CuentaSeeder {
  private readonly logger = new Logger('CuentaSeeder');

  constructor(private readonly cuentaService: CuentaService) {}

  async run() {
    try {
      const cuentas: CreateCuentaDto[] = [
        {
          email: 'admin@openfiber.cds',
          password: 'passwordAdminSU',
          isActive: true,
          tipo: TIPO_CUENTA.USER,
        },
        {
          email: 'admin@live.com',
          password: 'adminOpenFiber',
          isActive: true,
          tipo: TIPO_CUENTA.USER,
        },
      ];

      for (const cuenta of cuentas) {
        await this.cuentaService.createCuenta(cuenta);
      }

      this.logger.log('Cuentas sembradas correctamente');
    } catch (error) {
      handlerError(error, this.logger);
    }
  }
}
