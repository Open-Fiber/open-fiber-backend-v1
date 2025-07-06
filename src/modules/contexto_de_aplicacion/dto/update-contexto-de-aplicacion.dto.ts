// src/modules/contexto-de-aplicacion/dto/update-contexto-de-aplicacion.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateContextoDeAplicacionDto } from './create-contexto-de-aplicacion.dto';

export class UpdateContextoDeAplicacionDto extends PartialType(CreateContextoDeAplicacionDto) {
  @ApiPropertyOptional()
  descripcion?: string;

  @ApiPropertyOptional()
  maquinaId?: string;
}