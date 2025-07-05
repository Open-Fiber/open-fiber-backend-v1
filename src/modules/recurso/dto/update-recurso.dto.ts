// src/modules/recurso/dto/update-recurso.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateRecursoDto } from './create-recurso.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsUUID } from 'class-validator';

export class UpdateRecursoDto extends PartialType(CreateRecursoDto) {
  @ApiPropertyOptional()
  nombre?: string;

  @ApiPropertyOptional()
  descripcion?: string;

  @ApiPropertyOptional({
    example: ['uuid-de-la-maquina-3'],
    description: 'IDs de las máquinas a las que se asocia/desasocia este recurso. Se reemplazarán las asociaciones existentes.',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  maquinaIds?: string[];
}