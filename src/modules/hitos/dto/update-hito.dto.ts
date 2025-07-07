// src/modules/hito/dto/update-hito.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateHitoDto } from './create-hito.dto';

export class UpdateHitoDto extends PartialType(CreateHitoDto) {
  @ApiPropertyOptional()
  descripcion?: string;

  @ApiPropertyOptional()
  maquinaId?: string;
}