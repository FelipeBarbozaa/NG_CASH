export type CashOutReturn = {
  id?: string;
  username?: string;
  value?: number;
  createdAt?: Date;
}

export interface ITransactionModel {
  getCashOutById(id: string): Promise<CashOutReturn[]>;
  getCashInById(id: string): Promise<CashOutReturn[]>;
}

export interface ITransactionService {
  getCashOutById(id: string): Promise<CashOutReturn[]>;
  getCashInById(id: string): Promise<CashOutReturn[]>;
}