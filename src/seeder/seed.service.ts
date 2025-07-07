import { Injectable, Logger } from '@nestjs/common';
import { CuentaSeeder } from './cuenta.seeder';
import { PermisoSeeder } from './permiso.seeder';

@Injectable()
export class SeedService {
  private readonly logger = new Logger('SeedService');

  constructor(
    private readonly cuentaSeeder: CuentaSeeder,
    private readonly permisoSeeder: PermisoSeeder,
  ) {}

  public async runSeeders() {
    if (process.env.APP_PROD === true) {
      return { message: 'No se puede ejecutar seeders en producción' };
    }

    try {
      await this.permisoSeeder.run();
      await this.cuentaSeeder.run();

      return { message: 'Seeders ejecutados correctamente' };
    } catch (error) {
      this.logger.error('Error al ejecutar seeders:', error);
      throw error;
    }
  }
}
