// src/modules/paso-construccion/dto/update-paso-construccion.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePasoConstruccionDto } from './create-paso-construccion.dto';

export class UpdatePasoConstruccionDto extends PartialType(CreatePasoConstruccionDto) {
  @ApiPropertyOptional()
  nroPaso?: string;

  @ApiPropertyOptional()
  descripcion?: string;

  @ApiPropertyOptional()
  urlImagenGuia?: string;

  @ApiPropertyOptional()
  maquinaId?: string;
}