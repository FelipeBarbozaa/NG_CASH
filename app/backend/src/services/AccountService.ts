/* eslint-disable max-len */
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

  async isMoneySufficient(id: string, value: number): Promise<number> {
    const response = await this.model.getBalance(id);
    if (Number(response?.balance) < Number(value)) {
      throw new Error(ErrorTypes.InsufficientMoney);
    }

    return response?.balance as number - value;
  }

  async getAccountIdByUser(user: string): Promise<Account> {
    const response = await this.model.getAccountIdByUser(user);
    if (!response) {
      throw new Error(ErrorTypes.InvalidUser);
    }
    return response;
  }

  static checkSameAccount(account1: string, account2: string) {
    if (account1 === account2) {
      throw new Error(ErrorTypes.TransferSameAccount);
    }
  }

  // eslint-disable-next-line max-lines-per-function
  async transfer(data: TransferData): Promise<void> {
    const { debitedAccountId, creditedAccountUser, balance } = data;

    // Verifica se tem saldo sufuciente na conta e retorna o valor do saldo após a transferência
    const newDebitedValue = await this.isMoneySufficient(debitedAccountId, balance);

    // Verifica se existe uma conta para qual a pessoa está transferindo, se existir retorna os dados dela.
    const accountInfo = await this.getAccountIdByUser(creditedAccountUser);
    const creditedAccountId = accountInfo.id as string;

    // Verifica se as contas são iguais.
    AccountService.checkSameAccount(debitedAccountId, creditedAccountId);
    
    // Tira o dinheiro da pessoa que está trasnferindo
    await this.model.updateBalance(debitedAccountId, newDebitedValue);

    // Adiciona o dinheiro para a pessoa que está recebendo a transferência
    await this.model.updateBalance(creditedAccountId, Number(accountInfo.balance) + Number(balance));

    // Registra a transferência no banco de dados
    await this.model.createTransaction({id: uuidv4(), debitedAccountId, creditedAccountId, value: Number(balance) });
  }
}