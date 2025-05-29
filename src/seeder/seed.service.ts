import { Injectable, Logger } from '@nestjs/common';

import { handlerError } from '../common/utils/handlerError.utils';
import { ROLES } from '../common/constants';
import { CreateCuentaDto, CuentaDTO } from '../modules/cuenta/dto';
import { CuentaService } from '../modules/cuenta/services/cuenta.service';
import { TIPO_CUENTA } from '../common/constants/tipoCuenta';

@Injectable()
export class SeedService {
  private readonly logger = new Logger('SeederService');

  constructor(private readonly cuentaService: CuentaService) { }

  public async runSeeders() {
    if (process.env.APP_PROD == true) return { message: 'No se puede ejecutar seeders en producción' };
    try {
      const cuentaSU: CreateCuentaDto = {
        email: 'admin@openfiber.cds',
        password: 'passwordAdminSU',
        isActive: true,
        tipo: TIPO_CUENTA.USER
      }
      await this.cuentaService.createCuenta(cuentaSU);

      const cuenta: CreateCuentaDto = {
        email: 'admin@live.com',
        password: 'adminOpenFiber',
        isActive: true,
        tipo: TIPO_CUENTA.USER
      }
      await this.cuentaService.createCuenta(cuenta);

      return { message: 'Seeders ejecutados correctamente' };
    } catch (error) {
      handlerError(error, this.logger);
    }
  }
}
