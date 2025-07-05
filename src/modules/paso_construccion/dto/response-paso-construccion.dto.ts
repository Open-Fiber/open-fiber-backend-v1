// src/modules/paso-construccion/dto/response-paso-construccion.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { PasoConstruccionEntity } from '../entities/paso-construccion.entity';

export class ResponsePasoConstruccionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nroPaso: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  urlImagenGuia: string;

  @ApiProperty()
  maquinaId: string;

  constructor(p: PasoConstruccionEntity) {
    this.id = p.id;
    this.nroPaso = p.nroPaso;
    this.descripcion = p.descripcion;
    this.urlImagenGuia = p.urlImagenGuia;
    this.maquinaId = p.maquina.id;
  }
}