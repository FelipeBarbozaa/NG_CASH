/* eslint-disable max-lines-per-function */
import Transaction from '../database/models/Transaction';
import User from '../database/models/User';
import { CashOutReturn, ITransactionModel } from '../interfaces/Transaction';

export default class TransactionRepository implements ITransactionModel {
  constructor(private model = Transaction, private modelUser = User) {}

  async getCashOutById(id: string): Promise<CashOutReturn[]> {
    const response = await this.model.findAll(
      { where: { debitedAccountId: id }}
    );
  
    const getUsers = response.map(async(e) => {
      const result = await this.modelUser.findOne(
        { where: { accountId: e.creditedAccountId }});
      return result?.username;
    });
  
    const users = await Promise.all(getUsers);
    const cashOut = response.map((e, indice) => {
      const data = {
        id: e.id as unknown as string,
        username: users[indice],
        value: e.value,
        createdAt: e.createdAt,
      };
      return data;
    });
    return cashOut;
  }

  async getCashInById(id: string): Promise<CashOutReturn[]> {
    const response = await this.model.findAll(
      { where: { creditedAccountId: id }}
    );
  
    const getUsers = response.map(async(e) => {
      const result = await this.modelUser.findOne(
        { where: { accountId: e.debitedAccountId }});
      return result?.username;
    });
  
    const users = await Promise.all(getUsers);
    // eslint-disable-next-line sonarjs/no-identical-functions
    const cashIn = response.map((e, indice) => {
      const data = {
        id: e.id as unknown as string,
        username: users[indice],
        value: e.value,
        createdAt: e.createdAt,
      };
      return data;
    });
    return cashIn;
  }
}
