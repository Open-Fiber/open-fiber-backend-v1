// src/modules/recurso/controllers/recurso.controller.ts
import {
  Controller, Post, Body, Get, Param, Put, Delete, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RecursoService } from '../services/recurso.service';
import { CreateRecursoDto } from '../dto/create-recurso.dto';
import { UpdateRecursoDto } from '../dto/update-recurso.dto';
import { ResponseRecursoDto } from '../dto/response-recurso.dto';
import { AuthGuard, PermisoGuard } from 'src/auth/guards';

@ApiBearerAuth()
@ApiTags('Recursos')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('recursos')
export class RecursoController {
  constructor(private readonly service: RecursoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo recurso' })
  @ApiResponse({ status: 201, type: ResponseRecursoDto })
  async create(@Body() dto: CreateRecursoDto) {
    const r = await this.service.create(dto);
    return new ResponseRecursoDto(r);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los recursos' })
  @ApiResponse({ status: 200, type: [ResponseRecursoDto] })
  async findAll() {
    const all = await this.service.findAll();
    return all.map(r => new ResponseRecursoDto(r));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un recurso por ID' })
  @ApiResponse({ status: 200, type: ResponseRecursoDto })
  async findOne(@Param('id') id: string) {
    return new ResponseRecursoDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un recurso por ID' })
  @ApiResponse({ status: 200, type: ResponseRecursoDto })
  async update(@Param('id') id: string, @Body() dto: UpdateRecursoDto) {
    return new ResponseRecursoDto(await this.service.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un recurso por ID' })
  @ApiResponse({ status: 200, description: 'Eliminado correctamente' })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}