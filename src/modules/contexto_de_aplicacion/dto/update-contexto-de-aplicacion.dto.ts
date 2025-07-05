// src/modules/contexto-de-aplicacion/dto/update-contexto-de-aplicacion.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateContextoDeAplicacionDto } from './create-contexto-de-aplicacion.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateContextoDeAplicacionDto extends PartialType(CreateContextoDeAplicacionDto) {
  @ApiPropertyOptional()
  descripcion?: string;

  @ApiPropertyOptional()
  maquinaId?: string;
}