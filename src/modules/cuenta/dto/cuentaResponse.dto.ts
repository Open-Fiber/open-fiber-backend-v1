import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CuentaEntity } from '../entities/cuenta.entity';
import { TIPO_CUENTA } from '../../../common/constants/tipoCuenta';

export class CuentaResponseDTO {
    @ApiProperty({
        example: '59b956ac-3764-4f02-bd07-92f49dd9b562',
        type: String,
        description: 'ID de la cuenta',
    })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({
        example: 'john@live.com',
        type: String,
        description: 'Correo electrónico del usuario',
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: TIPO_CUENTA.USER,
        enum: TIPO_CUENTA,
        description: 'Tipo de Cuenta'
    })
    @IsOptional()
    @IsEnum(TIPO_CUENTA)
    tipo: TIPO_CUENTA;

    public constructor(cuenta: CuentaEntity) {
        this.id = cuenta.id;
        this.email = cuenta.email;
        this.tipo = cuenta.tipo;
    }
}