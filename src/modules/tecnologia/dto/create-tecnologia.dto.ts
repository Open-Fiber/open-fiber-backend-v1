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

  @ApiProperty({
    example: ['uuid-de-la-maquina-a', 'uuid-de-la-maquina-b'],
    description: 'IDs de las máquinas a las que se asocia esta tecnología',
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  maquinaIds: string[];
}