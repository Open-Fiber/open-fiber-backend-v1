// src/modules/contexto-de-aplicacion/dto/response-contexto-de-aplicacion.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { ContextoDeAplicacionEntity } from '../entities/contexto-de-aplicacion.entity';

export class ResponseContextoDeAplicacionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  maquinaId: string;

  constructor(c: ContextoDeAplicacionEntity) {
    this.id = c.id;
    this.descripcion = c.descripcion;
    this.maquinaId = c.maquina.id;
  }
}