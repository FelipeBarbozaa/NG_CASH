import Account from '../database/models/Account';
import User from '../database/models/User';

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
  getAccountIdByUser(user: string): Promise<User>;
  createTransaction(data: TransactionData): Promise<void>;
}

export interface IAccountService {
  getBalance(accountId: string): Promise<Account | null>;
  transfer(data: TransferData): Promise<void>
}