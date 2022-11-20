import Account from '../database/models/Account';

export type TransferData = {
  debitedAccountId: string;
  creditedAccountUser: string;
  balance: number;
}

export type TransactionData = {
  id: string;
  debitedAccountId: string;
  creditedAccountId: string;
  value: number;
}

export interface IAccountModel {
  getBalance(accountId: string): Promise<Account | null>;
  updateBalance(accountId: string, value: number): Promise<void>;
  getAccountIdByUser(user: string): Promise<Account>;
  createTransaction(data: TransactionData): Promise<void>;
}

export interface IAccountService {
  getBalance(accountId: string): Promise<Account | null>;
  transfer(data: TransferData): Promise<void>
  isMoneySufficient(id: string, value: number): Promise<number>
  getAccountIdByUser(user: string): Promise<Account>;

}