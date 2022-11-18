import Account from '../database/models/Account';
import { IAccountModel } from '../interfaces/Balance';

export default class AccountRepository implements IAccountModel {
  constructor(private accountModel = Account) {}

  async getBalance(accountId: string): Promise<number | null> {
    const response = await this.accountModel.findOne(
      { where: { id: accountId }, attributes: { exclude: ['id']} }
    );
    return response as unknown as number;
  }
}