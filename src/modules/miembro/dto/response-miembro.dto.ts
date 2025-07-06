// src/modules/miembro/dto/response-miembro.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { MiembroEntity } from './../entities/miembro.entity';

export class ResponseMiembroDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  isActivo: boolean;

  @ApiProperty()
  usuarioId: string;

  @ApiProperty()
  organizacionId: string;

  constructor(m: MiembroEntity) {
    this.id = m.id;
    this.isActivo = m.isActivo;
    this.usuarioId = m.usuario.id;
    this.organizacionId = m.organizacion.id;
  }
}