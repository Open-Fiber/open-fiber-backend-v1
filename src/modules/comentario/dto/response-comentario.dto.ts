// src/modules/comentario/dto/response-comentario.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { ComentarioEntity } from '../entities/comentario.entity';

export class ResponseComentarioDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  mensaje: string;

  @ApiProperty()
  cuentaId: string;

  @ApiProperty()
  claseId: string;

  @ApiProperty()
  createdAt: Date; // Incluimos createdAt de BaseEntity

  constructor(c: ComentarioEntity) {
    this.id = c.id;
    this.mensaje = c.mensaje;
    this.cuentaId = c.cuenta.id;
    this.claseId = c.clase.id;
    this.createdAt = c.createdAt;
  }
}