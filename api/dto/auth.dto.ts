export interface LoginFormDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
}

export type RegisterFormDTO = LoginFormDTO & { fullName: string };
export type RegisterResponseDTO = LoginResponseDTO;

export interface IUser {
  id: number;
  email: string;
  fullName: string;
  roles: string[];
}

export type GetUserResponseDTO = Omit<IUser, 'roles'> & { roles: Array<{value:string}> };
