// src/modules/curso/dto/update-curso.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional } from 'class-validator';
import { CreateCursoDto } from './create-curso.dto';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  duracion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nivel?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  creadoPorId?: string;
}