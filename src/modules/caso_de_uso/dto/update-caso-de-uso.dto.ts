// src/modules/caso-de-uso/dto/update-caso-de-uso.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCasoDeUsoDto } from './create-caso-de-uso.dto';

export class UpdateCasoDeUsoDto extends PartialType(CreateCasoDeUsoDto) {
  @ApiPropertyOptional()
  descripcion?: string;

  @ApiPropertyOptional()
  maquinaId?: string;
}