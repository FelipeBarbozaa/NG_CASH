export interface IAccountModel {
  getBalance(accountId: string): Promise<number | null>;
}

export interface IAccountService {
  getBalance(accountId: string): Promise<number | null>;
}