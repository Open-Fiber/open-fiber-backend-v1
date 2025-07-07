// src/modules/hito/dto/create-hito.dto.ts
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHitoDto {
  @ApiProperty({ example: 'Implementación de la fase inicial del proyecto.' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: 'uuid-de-la-maquina' })
  @IsUUID()
  maquinaId: string;
}