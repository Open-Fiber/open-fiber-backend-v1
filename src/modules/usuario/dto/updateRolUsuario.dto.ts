import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateRolUsuarioDto {
    @ApiProperty({
        example: '1ed9e7d7-6a51-4d5d-9ef5-ad33a6fdba9e',
        type: String,
        description: 'ID del Rol que se asignará al usuario'
    })
    @IsNotEmpty()
    @IsString()
    rolId: string;
}