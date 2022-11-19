import User from '../database/models/User';
import Account from '../database/models/Account';
import { IUserModel, RegisterData } from '../interfaces/User';

export default class UserRepository implements IUserModel {
  constructor(private userModel = User, private accountModel = Account) {}

  async getByUser(user: string): Promise<User | null> {
    const response = await this.userModel.findOne(
      { where:{ username: user } }
    );
    return response;
  }

  async createUser(data: RegisterData): Promise<User> {
    await this.accountModel.create({ id: data.accountId, balance: 100.00 });
    const response = await this.userModel.create(data);
    await Promise.all([response]);
    return response;
  }
}