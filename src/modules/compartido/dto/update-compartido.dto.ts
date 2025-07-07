// src/modules/compartido/dto/update-compartido.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, Length, IsOptional } from 'class-validator';
import { CreateCompartidoDto } from './create-compartido.dto';

export class UpdateCompartidoDto extends PartialType(CreateCompartidoDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 1)
  estado?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  organizacionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  maquinaId?: string;
}