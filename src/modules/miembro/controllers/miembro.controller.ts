// src/modules/miembro/controllers/miembro.controller.ts
import {
  Controller, Post, Body, Get, Param, Put, Delete, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MiembroService } from './../services/miembro.service';
import { CreateMiembroDto } from './../dto/create-miembro.dto';
import { UpdateMiembroDto } from './../dto/update-miembro.dto';
import { ResponseMiembroDto } from './../dto/response-miembro.dto';
import { AuthGuard, PermisoGuard } from './../../../auth/guards';

@ApiBearerAuth()
@ApiTags('Miembros de Organización')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('miembros')
export class MiembroController {
  constructor(private readonly service: MiembroService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo miembro para una organización' })
  @ApiResponse({ status: 201, type: ResponseMiembroDto })
  async create(@Body() dto: CreateMiembroDto) {
    const m = await this.service.create(dto);
    return new ResponseMiembroDto(m);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los miembros' })
  @ApiResponse({ status: 200, type: [ResponseMiembroDto] })
  async findAll() {
    const all = await this.service.findAll();
    return all.map(m => new ResponseMiembroDto(m));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un miembro por ID' })
  @ApiResponse({ status: 200, type: ResponseMiembroDto })
  async findOne(@Param('id') id: string) {
    return new ResponseMiembroDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un miembro por ID' })
  @ApiResponse({ status: 200, type: ResponseMiembroDto })
  async update(@Param('id') id: string, @Body() dto: UpdateMiembroDto) {
    return new ResponseMiembroDto(await this.service.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un miembro por ID' })
  @ApiResponse({ status: 200, description: 'Miembro eliminado correctamente' })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}