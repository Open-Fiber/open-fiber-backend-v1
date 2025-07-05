// src/modules/caso-de-uso/dto/update-caso-de-uso.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCasoDeUsoDto } from './create-caso-de-uso.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCasoDeUsoDto extends PartialType(CreateCasoDeUsoDto) {
  @ApiPropertyOptional()
  descripcion?: string;

  @ApiPropertyOptional()
  maquinaId?: string;
}