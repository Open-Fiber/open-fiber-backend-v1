import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CuentaDTO } from '../../modules/cuenta/dto';
import { CuentaService } from 'src/modules/cuenta/services/cuenta.service';
import { RegistrarUsuarioDto } from '../dto/RegistrarUsuario.dto';

@ApiTags('')
@Controller('registrar')
export class UsuarioController {
    constructor(private readonly cuentaService: CuentaService) {}

    @Post()
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado', type: CuentaDTO })
    async create(@Body() registrarUsuarioDto: RegistrarUsuarioDto): Promise<CuentaDTO> {
        return new CuentaDTO(await this.cuentaService.registrarUsuario(registrarUsuarioDto));
    }
}