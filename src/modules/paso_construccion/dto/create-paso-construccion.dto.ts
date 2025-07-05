// src/modules/paso-construccion/dto/create-paso-construccion.dto.ts
import { IsString, IsUrl, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePasoConstruccionDto {
  @ApiProperty({ example: '1.1' })
  @IsString()
  nroPaso: string;

  @ApiProperty({ example: 'Instalar el módulo de control principal.' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: 'https://ejemplo.com/imagen-paso-1.jpg' })
  @IsUrl()
  urlImagenGuia: string;

  @ApiProperty({ example: 'uuid-de-la-maquina' })
  @IsUUID()
  maquinaId: string;
}