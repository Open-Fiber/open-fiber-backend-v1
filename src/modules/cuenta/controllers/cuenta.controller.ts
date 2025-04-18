import { Body, Controller, Get, Delete, Param, UseGuards, ParseUUIDPipe, Query, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger/dist';

import { RolesAccess } from '../../../auth/decorators/roles.decorator';
import { AuthGuard, RolesGuard } from '../../../auth/guards/';
import { CreateCuentaDto, CuentaDTO } from '../dto/';
import { CuentaService } from '../services/cuenta.service';
import { QueryDto } from '../../../common/dto/query.dto';
import { ResponseMessage } from '../../../common/interfaces/responseMessage.interface';

@ApiTags('Cuentas')
// @ApiBearerAuth()
// @UseGuards(AuthGuard, RolesGuard)
@Controller('cuentas')
export class CuentaController {
  constructor(private readonly cuentaService: CuentaService) { }

  @Post()
  @ApiOperation({ summary: 'Crear una cuenta' })
  @ApiResponse({ status: 200, description: 'Cuenta creada', type: [CuentaDTO] })
  async createCuenta(
    @Body() createCuentaDto: CreateCuentaDto,    
  ): Promise<ResponseMessage> {
    return {
      statusCode: 200,
      data: await this.cuentaService.createCuenta(createCuentaDto),
    }
  }

  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'order', type: 'string', required: false })
  @ApiQuery({ name: 'attr', type: 'string', required: false })
  @ApiQuery({ name: 'value', type: 'string', required: false })
  @Get()
  @ApiOperation({ summary: 'Obtener todas las cuentas' })
  @ApiResponse({ status: 200, description: 'Lista de cuentas', type: [CuentaDTO] })
  public async findAll(@Query() queryDto: QueryDto): Promise<ResponseMessage> {
    return {
      statusCode: 200,
      data: await this.cuentaService.findAll(queryDto),
    };
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseMessage> {
    return {
      statusCode: 200,
      data: await this.cuentaService.findOne(id),
    }
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Post('cambiar-estado/:id')
  public async cambiarEstado(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseMessage> {
    return {
      statusCode: 200,
      data: await this.cuentaService.cambiarEstadoCuenta(id),
    };
  }

  // @RolesAccess('ADMIN')
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  public async delete(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseMessage> {
    return await this.cuentaService.delete(id);
  }
}
