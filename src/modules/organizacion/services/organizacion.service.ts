import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizacionEntity } from '../entities/organizacion.entity';
import { Repository } from 'typeorm';
import { CreateOrganizacionDto } from '../dto/createOrganizacion.dto';
import { OrganizacionDto } from '../dto/organizacion.dto';
import { CuentaService } from '../../../modules/cuenta/services/cuenta.service';
import { handlerError } from 'src/common/utils/handlerError.utils';
import { UpdateOrganizacionDto } from '../dto/updateOrganizacion.dto';

@Injectable()
export class OrganizacionService {
    private readonly logger = new Logger('OrganizacionService');
    
      constructor(
        @InjectRepository(OrganizacionEntity)
        private readonly organizacionRepository: Repository<OrganizacionEntity>,
        private readonly cuentaService: CuentaService
      ) { }

      async create(createOrganizacionDto: CreateOrganizacionDto): Promise<OrganizacionDto> {
        try {
            const { cuentaId, ...createOrganizacion } = createOrganizacionDto;
            const organizacion = this.organizacionRepository.create({
                ...createOrganizacion,
                cuenta: { id: cuentaId }
            });
            
            const savedOrganizacion = await this.organizacionRepository.save(organizacion);
            return new OrganizacionDto(savedOrganizacion);
        } catch (error) {
            handlerError(error, this.logger);
        }
    }

    async findAll(): Promise<OrganizacionDto[]> {
        try {
            const organizaciones = await this.organizacionRepository.find({ 
                relations: ['cuenta'] 
            });
            return organizaciones.map(organizacion => new OrganizacionDto(organizacion));
        } catch (error) {
            handlerError(error, this.logger);
        }
    }

    async findOne(id: string): Promise<OrganizacionDto> {
        try {
            const organizacion = await this.organizacionRepository.findOne({ 
                where: { id }, 
                relations: ['cuenta'] 
            });
            
            return new OrganizacionDto(organizacion);
        } catch (error) {
          handlerError(error, this.logger);
        }
    }

    async update(id: string, updateOrganizacionDto: UpdateOrganizacionDto): Promise<OrganizacionDto> {
        try {
            const organizacion = await this.organizacionRepository.preload({
                id,
                ...updateOrganizacionDto
            });
            
            const updatedOrganizacion = await this.organizacionRepository.save(organizacion);
            return new OrganizacionDto(updatedOrganizacion);
        } catch (error) {
          handlerError(error, this.logger);
        }
    }
    
}