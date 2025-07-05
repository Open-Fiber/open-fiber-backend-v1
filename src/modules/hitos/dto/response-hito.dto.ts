// src/modules/hito/dto/response-hito.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { HitoEntity } from '../entities/hito.entity';

export class ResponseHitoDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  maquinaId: string;

  constructor(h: HitoEntity) {
    this.id = h.id;
    this.descripcion = h.descripcion;
    this.maquinaId = h.maquina.id;
  }
}