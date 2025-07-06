import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger/dist/decorators';

import { AuthDTO } from './../dto/auth.dto';
import { AuthService } from './../services/auth.service';
import { ResponseMessage } from './../../common/interfaces/responseMessage.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    // private readonly userService: UserService
  ) { }

  // @Post('register')
  // public async register(@Body() createUserDto: CreateUserDto): Promise<ResponseMessage> {
  //   console.log(createUserDto);
  //   return {
  //     data: await this.userService.createUser(createUserDto),
  //   };
  // }

  @Post('login')
  @ApiOperation({ summary: 'Obtener token de acceso para la cuenta' })
  @ApiResponse({ description: 'Cambio realizado', example: `{ accessToken: 'token', dataCuenta: 'any'}` })
  public async login(@Body() authDto: AuthDTO): Promise<ResponseMessage> {
    const { email, password } = authDto;
    return {
      data: await this.authService.login(email, password),
    };
  }

  @ApiQuery({ name: 'token', type: 'string', required: true })
  @Post('checkToken')
  @ApiOperation({ summary: 'Revisar el token' })
  @ApiResponse({ description: 'Cambio realizado', example: `{ rol: 'rol', sub: 'any', tipo: 'tipoCuenta', time: 'tiempo útil en segundos', isExpired: 'false'}` })
  public async checkToken(@Query('token') token: string): Promise<ResponseMessage> {
    return {
      data: await this.authService.checkToken(token)
    };
  }

  // recover password
  // @Post('recover')
  // public async recover(@Body() { username }) {
  // return await this.authService.recoverPassword(username);
  // }
}
