import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMaquinaDto } from './create-maquina.dto';

export class UpdateMaquinaDto extends PartialType(CreateMaquinaDto) {
    @ApiPropertyOptional()
    informacion?: string;

    @ApiPropertyOptional()
    version?: string;

    @ApiPropertyOptional()
    impacto?: string;

    @ApiPropertyOptional()
    evolucion?: string;

    @ApiPropertyOptional({ enum: ['estetica', 'electronica', 'mecanica', 'codigo', 'original'] })
    categoria?: string;

    @ApiPropertyOptional()
    isPrivate?: boolean;

    @ApiPropertyOptional()
    proyectoId?: string;

    @ApiPropertyOptional({ example: 'UUID de la nueva máquina original' })
    maquinaOriginalId?: string;

}
