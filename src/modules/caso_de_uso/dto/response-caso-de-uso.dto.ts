// src/modules/caso-de-uso/dto/response-caso-de-uso.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { CasoDeUsoEntity } from './../entities/caso-de-uso.entity';

export class ResponseCasoDeUsoDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  maquinaId: string;

  constructor(c: CasoDeUsoEntity) {
    this.id = c.id;
    this.descripcion = c.descripcion;
    this.maquinaId = c.maquina.id;
  }
}