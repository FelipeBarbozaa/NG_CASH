import { v4 as uuidv4 } from 'uuid';
import Account from '../database/models/Account';
import { ErrorTypes } from '../error/catalog';
import {
  IAccountModel, IAccountService, TransferData
} from '../interfaces/Account';

export default class AccountService implements IAccountService {
  constructor(private model: IAccountModel) {}

  async getBalance(accountId: string): Promise<Account | null> {
    const response = await this.model.getBalance(accountId);
    return response;
  }

  // eslint-disable-next-line max-lines-per-function
  async transfer(data: TransferData): Promise<void> {
    const response = await this.getBalance(data.debitedAccountId);

    // Checa se tem dinheiro suficiente
    const value = response?.balance as number;
    if (value < data.balance) {
      throw new Error(ErrorTypes.InsufficientMoney);
    }

    // Pega o id e o balance da conta que vai receber
    const { accountInfo } = await this
      .model.getAccountIdByUser(data.creditedAccountUser);
    console.log(typeof accountInfo?.balance);

    // Tira o saldo de quem fez a transferência
    await this.model.updateBalance(
      data.debitedAccountId, value - data.balance
    );

    // Adiciona o saldo pra quem recebeu a transferência
    await this.model.updateBalance(
      accountInfo?.id as string,
      Number(accountInfo?.balance) + data.balance
    );

    // Cria a transação na tabela transactions

    await this.model.createTransaction({
      id: uuidv4(),
      debitedAccountId: data.debitedAccountId,
      creditedAccountId: accountInfo?.id as string,
      value: data.balance
    });
  }
}