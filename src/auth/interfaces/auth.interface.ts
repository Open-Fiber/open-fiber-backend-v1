export interface IAuth {
  email: string;
  password: string;
}

export interface IAuthTokenResult {
  rol?: string;
  tipo: string;
  sub: string;
  iat: number;
  exp: number;
}