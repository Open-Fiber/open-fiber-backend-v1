import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const GetCuenta = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const cuenta = req.idCuenta;
        if (!cuenta)
            throw new InternalServerErrorException('Cuenta not found (request)');
        return (!data)
            ? cuenta
            : cuenta[data];
    }
);