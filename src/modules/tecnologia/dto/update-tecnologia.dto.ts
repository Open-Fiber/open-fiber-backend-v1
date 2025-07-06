// src/modules/tecnologia/dto/update-tecnologia.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTecnologiaDto } from './create-tecnologia.dto';

export class UpdateTecnologiaDto extends PartialType(CreateTecnologiaDto) {
  @ApiPropertyOptional()
  nombre?: string;

  @ApiPropertyOptional()
  tipo?: string;

  @ApiPropertyOptional()
  descripcion?: string;
}