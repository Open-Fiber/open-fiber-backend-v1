// src/modules/recurso/dto/create-recurso.dto.ts
import { IsString, IsArray, IsUUID, ArrayMinSize, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecursoDto {
  @ApiProperty({ example: 'Sensor de temperatura X300' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Sensor de alta precisión para monitoreo de temperatura en entornos industriales.' })
  @IsString()
  descripcion: string;

}