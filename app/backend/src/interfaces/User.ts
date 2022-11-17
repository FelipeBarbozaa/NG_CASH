import User from '../database/models/User';

export type RegisterData = {
  id?: string;
  username: string;
  password: string;
  repassword?: string;
  accountId?: string;
}


export interface IUserModel {
  getByUser(user: string): Promise<User | null>;
  createUser(data: RegisterData): Promise<User>;
}

export interface IUserService {
  createUser(data: RegisterData): Promise<string>;
}
