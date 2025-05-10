import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { CreateCuentaDto } from "../../../modules/cuenta/dto/createCuenta.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrganizacionDto {
    @ApiProperty({
        example: 'Fab Lab Santa Cruz',
        type: String,
        description: 'Nombre de la organización'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(120)
    nombre: string;

    @ApiProperty({
        example: 'Fab Lab oficial de la unifranz en Santa Cruz',
        type: String,
        description: 'Descripción de la organización'
    })
    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @ApiProperty({
        example: 'Unifranz - Santa Cruz',
        type: String,
        description: 'Dirección de la organización'
    })
    @IsNotEmpty()
    @IsString()
    direccion: string;

    @ApiProperty({
        example: 'Bolivia',
        type: String,
        description: 'País de la organización'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    pais: string;

    @ApiProperty({
        example: '3843789723',
        type: String,
        description: 'Teléfono de la organización'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    telefono: string;

    @ApiProperty({
        example: 'https://fablabscz.org',
        type: String,
        description: 'Página web de la organización'
    })
    @IsOptional()
    @IsString()
    pagina_url?: string;

    @ApiProperty({
        example: 'https://img1.wsimg.com/isteam/ip/3bd70cf6-3119-4a2e-bc7d-fceec99209a1/LogoTest.png/:/rs=w:311,h:150,cg:true,m/cr=w:311,h:150/qt=q:95',
        type: String,
        description: 'Url del logo de la organización'
    })
    @IsOptional()
    @IsString()
    logo_url?: string;

    @ApiProperty({
        example: '1ba354dd-3eef-46a5-8d31-d90bb5f8a3ae',
        type: String,
        description: 'ID de la cuenta'
    })
    @IsNotEmpty()
    cuentaId: string;
}