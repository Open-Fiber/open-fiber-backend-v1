import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthGuard, PermisoGuard } from './../guards';
import { QueryDto } from './../../common/dto/query.dto';
import { ORDER_ENUM } from './../../common/constants';
import { CreatePermisoDTO, UpdatePermisoDTO } from '../dto';
import { PermisoService } from './../services/permiso.service';
import { PermisoAccess } from './../decorators/permiso.decorator';
import { PERMISOS } from './../constants/permisos.constant';

@ApiTags('Permisos')
@ApiBearerAuth()
@UseGuards(AuthGuard, PermisoGuard)
@Controller('permiso')
export class PermisoController {

    constructor(private readonly permisoService: PermisoService) { }

    // @PermisoAccess(PERMISOS.PERMISO_CREATE)
    @Post()
    async create(@Body() createPermisoDto: CreatePermisoDTO): Promise<any> {
        return {
            data: await this.permisoService.create(createPermisoDto)
        }
    }

    @ApiQuery({ name: 'limit', type: 'number', required: false })
    @ApiQuery({ name: 'offset', type: 'number', required: false })
    @ApiQuery({ name: 'order', enum: ORDER_ENUM, required: false })
    @ApiQuery({ name: 'attr', type: 'string', required: false })
    @ApiQuery({ name: 'value', type: 'string', required: false })
    @Get()
    async findAll(@Query() queryDto: QueryDto): Promise<any> {
        const { data, countData } = await this.permisoService.findAll(queryDto);
        return {
            countData, data
        }
    }
    // @PermisoAccess(PERMISOS.PERMISO_READ)
    @ApiParam({ name: 'id', type: 'string' })
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
        return {
            data: await this.permisoService.findOne(id)
        }
    }

    // @PermisoAccess(PERMISOS.PERMISO_READ_All)
    @ApiParam({ name: 'id', type: 'string' })
    @Patch(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePermisoDto: UpdatePermisoDTO): Promise<any> {
        return {
            data: await this.permisoService.update(id, updatePermisoDto)
        }
    }

    // @PermisoAccess(PERMISOS.PERMISO_DELETE)
    @ApiParam({ name: 'id', type: 'string' })
    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
        return this.permisoService.remove(id);
    }
}
