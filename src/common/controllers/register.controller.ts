import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CuentaService } from 'src/modules/cuenta/services/cuenta.service';
import { RegistrarUsuarioDto } from '../dto/RegistrarUsuario.dto';
import { CuentaResponseDTO } from 'src/modules/cuenta/dto/cuenta-response.dto';

@ApiTags('Registrar')
@Controller('registrar')
export class RegistrarController {
    constructor(private readonly cuentaService: CuentaService) {}

    @Post()
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado', type: CuentaResponseDTO })
    async create(@Body() registrarUsuarioDto: RegistrarUsuarioDto): Promise<CuentaResponseDTO> {
        return new CuentaResponseDTO(await this.cuentaService.registrarUsuario(registrarUsuarioDto));
    }
}