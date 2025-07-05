// src/modules/like/controllers/like.controller.ts
import {
  Controller, Post, Body, Get, Param, Delete, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LikeService } from '../services/like.service';
import { CreateLikeDto } from '../dto/create-like.dto';
import { ResponseLikeDto } from '../dto/response-like.dto';
import { AuthGuard, PermisoGuard } from 'src/auth/guards';

@ApiBearerAuth()
@ApiTags('Likes')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('likes')
export class LikeController {
  constructor(private readonly service: LikeService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo like para una máquina por una cuenta' })
  @ApiResponse({ status: 201, type: ResponseLikeDto })
  async create(@Body() dto: CreateLikeDto) {
    const l = await this.service.create(dto);
    return new ResponseLikeDto(l);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los likes' })
  @ApiResponse({ status: 200, type: [ResponseLikeDto] })
  async findAll() {
    const all = await this.service.findAll();
    return all.map(l => new ResponseLikeDto(l));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un like por ID' })
  @ApiResponse({ status: 200, type: ResponseLikeDto })
  async findOne(@Param('id') id: string) {
    return new ResponseLikeDto(await this.service.findOne(id));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un like por ID' })
  @ApiResponse({ status: 200, description: 'Like eliminado correctamente' })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}