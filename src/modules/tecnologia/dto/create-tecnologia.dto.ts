// src/modules/tecnologia/dto/create-tecnologia.dto.ts
import { IsString, IsArray, IsUUID, ArrayMinSize, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTecnologiaDto {
  @ApiProperty({ example: 'Python 3.9' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Software' })
  @IsString()
  tipo: string;

  @ApiProperty({ example: 'Lenguaje de programación versátil para IA y automatización.' })
  @IsString()
  descripcion: string;
}