// src/modules/tecnologia/controllers/tecnologia.controller.ts
import {
  Controller, Post, Body, Get, Param, Put, Delete, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TecnologiaService } from './../services/tecnologia.service';
import { CreateTecnologiaDto } from './../dto/create-tecnologia.dto';
import { UpdateTecnologiaDto } from './../dto/update-tecnologia.dto';
import { ResponseTecnologiaDto } from './../dto/response-tecnologia.dto';
import { AuthGuard, PermisoGuard } from './../../../auth/guards';

@ApiBearerAuth()
@ApiTags('Tecnologías')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('tecnologias')
export class TecnologiaController {
  constructor(private readonly service: TecnologiaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tecnología' })
  @ApiResponse({ status: 201, type: ResponseTecnologiaDto })
  async create(@Body() dto: CreateTecnologiaDto) {
    const t = await this.service.create(dto);
    return new ResponseTecnologiaDto(t);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las tecnologías' })
  @ApiResponse({ status: 200, type: [ResponseTecnologiaDto] })
  async findAll() {
    const all = await this.service.findAll();
    return all.map(t => new ResponseTecnologiaDto(t));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tecnología por ID' })
  @ApiResponse({ status: 200, type: ResponseTecnologiaDto })
  async findOne(@Param('id') id: string) {
    return new ResponseTecnologiaDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tecnología por ID' })
  @ApiResponse({ status: 200, type: ResponseTecnologiaDto })
  async update(@Param('id') id: string, @Body() dto: UpdateTecnologiaDto) {
    return new ResponseTecnologiaDto(await this.service.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) una tecnología por ID' })
  @ApiResponse({ status: 200, description: 'Eliminado correctamente' })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}