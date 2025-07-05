// src/modules/comentario/dto/update-comentario.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateComentarioDto } from './create-comentario.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional } from 'class-validator';

export class UpdateComentarioDto extends PartialType(CreateComentarioDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mensaje?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  cuentaId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  claseId?: string;
}