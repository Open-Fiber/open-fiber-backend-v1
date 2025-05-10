import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrganizacionService } from '../services/organizacion.service';
import { CreateOrganizacionDto } from '../dto/createOrganizacion.dto';
import { UpdateOrganizacionDto } from '../dto/updateOrganizacion.dto';
import { OrganizacionDto } from '../dto/organizacion.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Organizacion')
@Controller('organizacion')
export class OrganizacionController {
    constructor(private readonly organizacionService: OrganizacionService) {}

    @Post()
    @ApiOperation({ summary: 'Crear una nueva organización' })
    @ApiResponse({ status: 200, description: 'Organización creada', type: OrganizacionDto })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    async create(@Body() createOrganizacionDto: CreateOrganizacionDto): Promise<OrganizacionDto> {
        return this.organizacionService.create(createOrganizacionDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las organizaciones' })
    @ApiResponse({ status: 200, description: 'Lista de organizaciones', type: [OrganizacionDto] })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    async findAll(): Promise<OrganizacionDto[]> {
        return this.organizacionService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una organización por ID' })
    @ApiResponse({ status: 200, description: 'Organización encontrada', type: OrganizacionDto })
    @ApiResponse({ status: 404, description: 'Organización no encontrada' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    async findOne(@Param('id') id: string): Promise<OrganizacionDto> {
        return this.organizacionService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una organización' })
    @ApiResponse({ status: 200, description: 'Organización actualizada', type: OrganizacionDto })
    @ApiResponse({ status: 404, description: 'Organización no encontrada' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    async update(
        @Param('id') id: string,
        @Body() updateOrganizacionDto: UpdateOrganizacionDto,
    ): Promise<OrganizacionDto> {
        return this.organizacionService.update(id, updateOrganizacionDto);
    }

}