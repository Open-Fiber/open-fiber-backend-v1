import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizacionEntity } from '../entities/organizacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizacionService {
    private readonly logger = new Logger('OrganizacionService');
    
      constructor(
        @InjectRepository(OrganizacionEntity)
        private readonly organizacionRepository: Repository<OrganizacionEntity>,
      ) { }
    
}