// src/modules/recurso/dto/update-recurso.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateRecursoDto } from './create-recurso.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRecursoDto extends PartialType(CreateRecursoDto) {
  @ApiPropertyOptional()
  nombre?: string;

  @ApiPropertyOptional()
  descripcion?: string;

}