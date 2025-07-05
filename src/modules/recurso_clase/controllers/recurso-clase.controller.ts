// src/modules/recurso-clase/controllers/recurso-clase.controller.ts
import {
  Controller, Post, Body, Get, Param, Put, Delete, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RecursoClaseService } from '../services/recurso-clase.service';
import { CreateRecursoClaseDto } from '../dto/create-recurso-clase.dto';
import { UpdateRecursoClaseDto } from '../dto/update-recurso-clase.dto';
import { ResponseRecursoClaseDto } from '../dto/response-recurso-clase.dto';
import { AuthGuard, PermisoGuard } from 'src/auth/guards';

@ApiBearerAuth()
@ApiTags('Recursos de Clase')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('recursos-clase')
export class RecursoClaseController {
  constructor(private readonly service: RecursoClaseService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo recurso para una clase' })
  @ApiResponse({ status: 201, type: ResponseRecursoClaseDto })
  async create(@Body() dto: CreateRecursoClaseDto) {
    const rc = await this.service.create(dto);
    return new ResponseRecursoClaseDto(rc);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los recursos de clase' })
  @ApiResponse({ status: 200, type: [ResponseRecursoClaseDto] })
  async findAll() {
    const all = await this.service.findAll();
    return all.map(rc => new ResponseRecursoClaseDto(rc));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un recurso de clase por ID' })
  @ApiResponse({ status: 200, type: ResponseRecursoClaseDto })
  async findOne(@Param('id') id: string) {
    return new ResponseRecursoClaseDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un recurso de clase por ID' })
  @ApiResponse({ status: 200, type: ResponseRecursoClaseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateRecursoClaseDto) {
    return new ResponseRecursoClaseDto(await this.service.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un recurso de clase por ID' })
  @ApiResponse({ status: 200, description: 'Recurso de clase eliminado correctamente' })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}