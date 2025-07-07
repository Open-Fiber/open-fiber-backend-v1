// src/modules/comentario/controllers/comentario.controller.ts
import {
  Controller, Post, Body, Get, Param, Put, Delete, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard, PermisoGuard } from './../../../auth/guards';
import { ComentarioService } from './../services/comentario.service';
import { CreateComentarioDto } from './../dto/create-comentario.dto';
import { UpdateComentarioDto } from './../dto/update-comentario.dto';
import { ResponseComentarioDto } from './../dto/response-comentario.dto';

@ApiBearerAuth()
@ApiTags('Comentarios')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('comentarios')
export class ComentarioController {
  constructor(private readonly service: ComentarioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo comentario para una clase por una cuenta' })
  @ApiResponse({ status: 201, type: ResponseComentarioDto })
  async create(@Body() dto: CreateComentarioDto) {
    const c = await this.service.create(dto);
    return new ResponseComentarioDto(c);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los comentarios' })
  @ApiResponse({ status: 200, type: [ResponseComentarioDto] })
  async findAll() {
    const all = await this.service.findAll();
    return all.map(c => new ResponseComentarioDto(c));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un comentario por ID' })
  @ApiResponse({ status: 200, type: ResponseComentarioDto })
  async findOne(@Param('id') id: string) {
    return new ResponseComentarioDto(await this.service.findOne(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un comentario por ID' })
  @ApiResponse({ status: 200, type: ResponseComentarioDto })
  async update(@Param('id') id: string, @Body() dto: UpdateComentarioDto) {
    return new ResponseComentarioDto(await this.service.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un comentario por ID' })
  @ApiResponse({ status: 200, description: 'Comentario eliminado correctamente' })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}