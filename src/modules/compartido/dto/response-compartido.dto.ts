// src/modules/compartido/dto/response-compartido.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { CompartidoEntity } from '../entities/compartido.entity';

export class ResponseCompartidoDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  estado: string;

  @ApiProperty()
  organizacionId: string;

  @ApiProperty()
  maquinaId: string;

  constructor(c: CompartidoEntity) {
    this.id = c.id;
    this.estado = c.estado;
    this.organizacionId = c.organizacion.id;
    this.maquinaId = c.maquina.id;
  }
}