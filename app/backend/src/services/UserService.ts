import md5 from 'md5';
import { v4 as uuidv4 } from 'uuid';
import {
  IUserModel, IUserService, LoginData, RegisterData
} from '../interfaces/User';
import { ErrorTypes } from '../error/catalog';
import Token from '../token/token';

export default class UserService implements IUserService {
  constructor (private model: IUserModel) {}

  async createUser(data: RegisterData): Promise<object> {
    const { username, password } = data;
    const checkIfExistsUser = await this.model.getByUser(data.username);
    if (checkIfExistsUser) {
      throw new Error(ErrorTypes.UserExists);
    }
    const { id, accountId } = await this.model.createUser(
      { id: uuidv4(), username, password: md5(password), accountId: uuidv4()}
    );
    const token = Token.createToken(
      { id, username, accountId, type: 'authentication' }
    );
    return { token, id, accountId };
  }

  async login(data: LoginData): Promise<object> {
    const { username, password } = data;
    const loginError = new Error(ErrorTypes.InvalidLogin);
    
    const response = await this.model.getByUser(username);
    if (!response || md5(password) !== response.password) throw loginError;

    const { id, accountId } = response;
    const token = Token.createToken(
      {id, username, accountId, type: 'authentication'}
    );
    return { token, id, accountId };
  }
}