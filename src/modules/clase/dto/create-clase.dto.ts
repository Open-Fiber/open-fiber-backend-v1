// src/modules/clase/dto/create-clase.dto.ts
import { IsString, IsUrl, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClaseDto {
  @ApiProperty({ example: 'Introducción a NestJS' })
  @IsString()
  tituloSeccion: string;

  @ApiProperty({ example: 'https://youtube.com/watch?v=video123' })
  @IsUrl()
  urlVideo: string;

  @ApiProperty({ example: 'uuid-del-curso' })
  @IsUUID()
  cursoId: string; // ID del curso al que pertenece esta clase
}