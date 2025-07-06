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
import { MaquinaService } from './../services/maquina.service';
import { CreateMaquinaDto } from './../dto/create-maquina.dto';
import { UpdateMaquinaDto } from './../dto/update-maquina.dto';
import { AuthGuard, PermisoGuard } from './../../../auth/guards';
import { ResponseMaquinaDto } from './../dto/response-maquina.dto';

@ApiBearerAuth()
@ApiTags('Máquinas')
@UseGuards(AuthGuard, PermisoGuard)
@Controller('maquinas')
export class MaquinaController {
  constructor(private readonly maquinaService: MaquinaService) {}

  @Post()
  async create(@Body() dto: CreateMaquinaDto) {
    const maquina = await this.maquinaService.create(dto);
    return new ResponseMaquinaDto(maquina);
  }

  @Post()
  async copy(@Body() dto: CreateMaquinaDto) {
    const maquina = await this.maquinaService.copy(dto);
    return new ResponseMaquinaDto(maquina);
  }

  @Get()
  async findAll() {
    const maquinas = await this.maquinaService.findAll();
    return maquinas.map(m => new ResponseMaquinaDto(m));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ResponseMaquinaDto(await this.maquinaService.findOne(id));
  }

  @Get('proyecto/:id')
  async findByProyecto(@Param('id') proyectoId: string) {
    const maquinas = await this.maquinaService.findByProyecto(proyectoId);
    return maquinas.map(m => new ResponseMaquinaDto(m));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMaquinaDto) {
    return new ResponseMaquinaDto(await this.maquinaService.update(id, dto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.maquinaService.softDelete(id);
  }
}
