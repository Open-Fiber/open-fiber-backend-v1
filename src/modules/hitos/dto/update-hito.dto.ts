// src/modules/hito/dto/update-hito.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateHitoDto } from './create-hito.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateHitoDto extends PartialType(CreateHitoDto) {
  @ApiPropertyOptional()
  descripcion?: string;

  @ApiPropertyOptional()
  maquinaId?: string;
}