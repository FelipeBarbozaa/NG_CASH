import md5 from 'md5';
import { v4 as uuidv4 } from 'uuid';
import { IUserModel, IUserService, RegisterData } from '../interfaces/User';
import { ErrorTypes } from '../error/catalog';

export default class UserService implements IUserService {
  constructor (private model: IUserModel) {}

  async createUser(data: RegisterData): Promise<string> {
    const { username, password } = data;
    const checkIfExistsUser = await this.model.getByUser(data.username);
    if (checkIfExistsUser) {
      throw new Error(ErrorTypes.UserExists);
    }
    const { accountId } = await this.model.createUser(
      { id: uuidv4(), username, password: md5(password), accountId: uuidv4()}
    );
    return accountId;
  }
}