export interface IAuth {
  email: string;
  password: string;
}

export interface IAuthTokenResult {
  rol?: string;
  permisos?: string[];
  tipo: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface SendEmailI {
  email: string;
}

export interface ResetPasswordI {
  token: string;
  password: string;
}
