import { ApiProperty } from '@nestjs/swagger';
import { MaquinaEntity } from '../entities/maquina.entity';

export class ResponseMaquinaDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    informacion: string;

    @ApiProperty()
    version: string;

    @ApiProperty()
    impacto: string;

    @ApiProperty()
    evolucion: string;

    @ApiProperty({ enum: ['estetica', 'electronica', 'mecanica', 'codigo', 'original'] })
    categoria: string;

    @ApiProperty()
    isPrivate: boolean;

    @ApiProperty()
    proyectoId: string;

    @ApiProperty({ required: false, nullable: true })
    maquinaOriginalId?: string;

    constructor(maquina: MaquinaEntity) {
        this.id = maquina.id;
        this.informacion = maquina.informacion;
        this.version = maquina.version;
        this.impacto = maquina.impacto;
        this.evolucion = maquina.evolucion;
        this.categoria = maquina.categoria;
        this.isPrivate = maquina.isPrivate;
        this.proyectoId = maquina.proyecto.id;
        this.maquinaOriginalId = maquina.maquinaOriginal?.id ?? null;
    }
}
