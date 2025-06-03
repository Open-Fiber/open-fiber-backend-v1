import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProyectoService } from './../services/proyecto.service';
import { CreateProyectoDto } from './../dto/create-proyecto.dto';
import { UpdateProyectoDto } from './../dto/update-proyecto.dto';
import { GetCuenta } from './../../../auth/decorators';
import { AuthGuard, PermisoGuard } from './../../../auth/guards';

@ApiBearerAuth()
@ApiTags('Proyectos')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  create(@Body() dto: CreateProyectoDto, @GetCuenta() idCuenta: string) {
    return this.proyectoService.create(dto, idCuenta);
  }

  @Get()
  findAll() {
    return this.proyectoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectoService.findOne(id);
  }

  @Get('cuenta/:id')
  findByCuenta(@Param('id') cuentaId: string) {
    return this.proyectoService.findByCuenta(cuentaId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProyectoDto) {
    return this.proyectoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoService.softDelete(id);
  }
}
