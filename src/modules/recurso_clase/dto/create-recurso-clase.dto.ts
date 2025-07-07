// src/modules/recurso-clase/dto/create-recurso-clase.dto.ts
import { IsString, IsUrl, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecursoClaseDto {
  @ApiProperty({ example: 'Presentación de la Clase 1' })
  @IsString()
  nombreRecurso: string;

  @ApiProperty({ example: 'https://ejemplo.com/presentacion-clase1.pdf' })
  @IsUrl()
  recursoUrl: string;

  @ApiProperty({ example: 'uuid-de-la-clase' })
  @IsUUID()
  claseId: string; // ID de la clase a la que pertenece este recurso
}