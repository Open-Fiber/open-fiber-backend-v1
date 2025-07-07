// src/modules/contexto-de-aplicacion/dto/create-contexto-de-aplicacion.dto.ts
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContextoDeAplicacionDto {
  @ApiProperty({ example: 'Entorno de producción industrial de alta exigencia.' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: 'uuid-de-la-maquina' })
  @IsUUID()
  maquinaId: string;
}