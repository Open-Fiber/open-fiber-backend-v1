import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDto, UpdateUsuarioDto, UsuarioDto } from '../dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado', type: UsuarioDto })
    async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<UsuarioDto> {
        return this.usuarioService.create(createUsuarioDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [UsuarioDto] })
    async findAll(): Promise<UsuarioDto[]> {
        return this.usuarioService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado', type: UsuarioDto })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    async findOne(@Param('id') id: string): Promise<UsuarioDto> {
        return this.usuarioService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un usuario' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado', type: UsuarioDto })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    async update(
        @Param('id') id: string,
        @Body() updateUsuarioDto: UpdateUsuarioDto,
    ): Promise<UsuarioDto> {
        return this.usuarioService.update(id, updateUsuarioDto);
    }

}