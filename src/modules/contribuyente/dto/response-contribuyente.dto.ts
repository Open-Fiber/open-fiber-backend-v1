import { ApiProperty } from '@nestjs/swagger';
import { ContribuyenteEntity } from '../entities/contribuyente.entity';

export class ResponseContribuyenteDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nombreCompleto: string;

  @ApiProperty()
  cargo: string;

  @ApiProperty()
  fotoUrl: string;

  @ApiProperty()
  perfilLinkedin: string;

  @ApiProperty()
  maquinaId: string;

  constructor(c: ContribuyenteEntity) {
    this.id = c.id;
    this.nombreCompleto = c.nombreCompleto;
    this.cargo = c.cargo;
    this.fotoUrl = c.fotoUrl;
    this.perfilLinkedin = c.perfilLinkedin;
    this.maquinaId = c.maquina.id;
  }
}