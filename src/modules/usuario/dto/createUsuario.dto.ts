import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { GENERO } from "../../../common/constants/genero";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDto {
    @ApiProperty({
        example: 'Jhon',
        type: String,
        description: 'Nombre del Usuario'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombre: string;

    @ApiProperty({
        example: 'Doe',
        type: String,
        description: 'Apellido del usuario'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    apellido: string;

    @ApiProperty({
        example: 'Bolivia',
        type: String,
        description: 'Pais de origen del usuario'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    pais: string;

    @ApiProperty({
        example: GENERO.MASCULINO,
        enum: GENERO,
        description: 'Genero del usuario'
    })
    @IsNotEmpty()
    @IsEnum(GENERO)
    sexo: GENERO;

    @ApiProperty({
        example: '2024-10-24',
        type: Date,
        description: 'Fecha de Nacimiento del usuario'
    })
    @IsOptional()
    @IsDate()
    fechaNacimiento?: Date;

    @ApiProperty({
        example: '77442232',
        type: String,
        description: 'Número de celular del usuario'
    })
    @IsOptional()
    @IsString()
    @MaxLength(20)
    celular?: string;

    @ApiProperty({
        example: 'https://scontent.fsrz1-1.fna.fbcdn.net/v/t39.30808-6/321514687_828263794936611_9117207435075792485_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DZ3kknwy0MYQ7kNvgGpd28s&_nc_ht=scontent.fsrz1-1.fna&oh=00_AYDVBsizxPljlSdcHXm_2eM9syvkH1X9sUTlOzLPSBbsNw&oe=667B65BB',
        type: String,
        description: 'URL de la foto de perfil del usuario'
    })
    @IsOptional()
    @IsString()
    fotoUrl?: string;

    @ApiProperty({
        example: '1ed9e7d7-6a51-4d5d-9ef5-ad33a6fdba9e',
        type: String,
        description: 'ID de la cuenta del usuario'
    })
    @IsNotEmpty()
    @IsString()
    cuentaId: string;
}