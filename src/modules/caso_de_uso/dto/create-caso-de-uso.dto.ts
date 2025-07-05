// src/modules/caso-de-uso/dto/create-caso-de-uso.dto.ts
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCasoDeUsoDto {
  @ApiProperty({ example: 'Optimización del rendimiento energético en motores.' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: 'uuid-de-la-maquina' })
  @IsUUID()
  maquinaId: string;
}