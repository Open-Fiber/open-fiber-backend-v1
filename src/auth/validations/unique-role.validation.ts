import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { RolService } from '../services/rol.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueRoleConstraint implements ValidatorConstraintInterface {

    constructor(
        private readonly roleService: RolService
    ) { }

    async validate(role: string, args: ValidationArguments) {
        const roleExists = await this.roleService.findOneByName(role);
        return !roleExists;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Role name already exists';
    }
}

export function UniqueRole(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: UniqueRoleConstraint,
        });
    };
}