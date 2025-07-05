// src/modules/clase/dto/response-clase.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { ClaseEntity } from '../entities/clase.entity';

export class ResponseClaseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tituloSeccion: string;

  @ApiProperty()
  urlVideo: string;

  @ApiProperty()
  cursoId: string;

  constructor(c: ClaseEntity) {
    this.id = c.id;
    this.tituloSeccion = c.tituloSeccion;
    this.urlVideo = c.urlVideo;
    this.cursoId = c.curso.id;
  }
}