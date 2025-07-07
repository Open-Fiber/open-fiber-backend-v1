// src/modules/recurso-clase/dto/response-recurso-clase.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { RecursoClaseEntity } from './../entities/recurso-clase.entity';

export class ResponseRecursoClaseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nombreRecurso: string;

  @ApiProperty()
  recursoUrl: string;

  @ApiProperty()
  claseId: string;

  constructor(rc: RecursoClaseEntity) {
    this.id = rc.id;
    this.nombreRecurso = rc.nombreRecurso;
    this.recursoUrl = rc.recursoUrl;
    this.claseId = rc.clase.id;
  }
}