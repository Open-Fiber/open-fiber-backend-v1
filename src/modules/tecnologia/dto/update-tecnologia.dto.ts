// src/modules/tecnologia/dto/update-tecnologia.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTecnologiaDto } from './create-tecnologia.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsUUID } from 'class-validator';

export class UpdateTecnologiaDto extends PartialType(CreateTecnologiaDto) {
  @ApiPropertyOptional()
  nombre?: string;

  @ApiPropertyOptional()
  tipo?: string;

  @ApiPropertyOptional()
  descripcion?: string;
}