// src/modules/curso/dto/response-curso.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { CursoEntity } from '../entities/curso.entity';

export class ResponseCursoDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  duracion: string;

  @ApiProperty()
  nivel: string;

  @ApiProperty()
  creadorId: string;

  constructor(c: CursoEntity) {
    this.id = c.id;
    this.titulo = c.titulo;
    this.descripcion = c.descripcion;
    this.duracion = c.duracion;
    this.nivel = c.nivel;
    this.creadorId = c.creador.id;
  }
}