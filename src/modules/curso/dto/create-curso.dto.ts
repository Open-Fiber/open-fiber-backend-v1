// src/modules/curso/dto/create-curso.dto.ts
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCursoDto {
  @ApiProperty({ example: 'Introducción a la Inteligencia Artificial' })
  @IsString()
  titulo: string;

  @ApiProperty({ example: 'Aprende los fundamentos de la IA y sus aplicaciones.' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: '20 horas' })
  @IsString()
  duracion: string;

  @ApiProperty({ example: 'Básico' })
  @IsString()
  nivel: string;

  @ApiProperty({ example: 'uuid-de-la-cuenta-creadora' })
  @IsUUID()
  creadoPorId: string; // ID de la cuenta que crea el curso
}