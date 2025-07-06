// src/modules/recurso/dto/response-recurso.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { RecursoEntity } from '../entities/recurso.entity';

export class ResponseRecursoDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  descripcion: string;

  constructor(r: RecursoEntity) {
    this.id = r.id;
    this.nombre = r.nombre;
    this.descripcion = r.descripcion;
  }
}