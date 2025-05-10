import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PermisoService } from '../services/permiso.service';

@ValidatorConstraint({ name: "UniquePermission", async: true })
@Injectable()
export class UniquePermissionConstraint implements ValidatorConstraintInterface {

    constructor(
        private permissionService: PermisoService,
    ) { }

    async validate(permission: string, args: ValidationArguments) {
        const permissionExists = await this.permissionService.findOneByName(permission);
        return !permissionExists;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Permission name already exists';
    }
}

export function UniquePermission(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: UniquePermissionConstraint,
        });
    };
}