import Account from '../database/models/Account';
import Transaction from '../database/models/Transaction';
import User from '../database/models/User';
import { IAccountModel, TransactionData } from '../interfaces/Account';

export default class AccountRepository implements IAccountModel {
  constructor(
    private accountModel = Account,
    private userModel = User,
    private transactionModel = Transaction
    ) {}

  async getBalance(accountId: string): Promise<Account | null> {
    const response = await this.accountModel.findOne(
      { where: { id: accountId }, attributes: { exclude: ['id']} }
    );
    return response;
  }

  async updateBalance(accountId: string, value: number): Promise<void> {
    await this.accountModel.update(
      { balance: value },
      { where: { id: accountId }}
    );
  }

  async getAccountIdByUser(username: string): Promise<User> {
    const response = await this.userModel.findOne(
      { where: { username }, include: [{
        model: Account,
        as: 'accountInfo'
    }]});
    return response as User;
  }

  async createTransaction(data: TransactionData): Promise<void> {
    await this.transactionModel.create(
      {...data, createdAt: new Date()}
      );
  }
}