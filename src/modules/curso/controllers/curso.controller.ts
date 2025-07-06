// src/modules/curso/controllers/curso.controller.ts
import {
  Controller, Post, Body, Get, Param, Put, Delete, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CursoService } from './../services/curso.service';
import { CreateCursoDto } from './../dto/create-curso.dto';
import { UpdateCursoDto } from './../dto/update-curso.dto';
import { ResponseCursoDto } from './../dto/response-curso.dto';
import { AuthGuard, PermisoGuard } from './../../../auth/guards';

@ApiBearerAuth()
@ApiTags('Cursos')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('cursos')
export class CursoController {
  constructor(private readonly service: CursoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo curso' })
  @ApiResponse({ status: 201, type: ResponseCursoDto })
  async create(@Body() dto: CreateCursoDto) {
    const c = await this.service.create(dto);
    return new ResponseCursoDto(c);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los cursos' })
  @ApiResponse({ status: 200, type: [ResponseCursoDto] })
  async findAll() {
    const all = await this.service.findAll();
    return all.map(c => new ResponseCursoDto(c));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un curso por ID' })
  @ApiResponse({ status: 200, type: ResponseCursoDto })
  async findOne(@Param('id') id: string) {
    return new ResponseCursoDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un curso por ID' })
  @ApiResponse({ status: 200, type: ResponseCursoDto })
  async update(@Param('id') id: string, @Body() dto: UpdateCursoDto) {
    return new ResponseCursoDto(await this.service.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un curso por ID' })
  @ApiResponse({ status: 200, description: 'Curso eliminado correctamente' })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}