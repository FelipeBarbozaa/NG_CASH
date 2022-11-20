import Transaction from '../database/models/Transaction';

export interface ITransactionModel {
  getAllById(id: string): Promise<Transaction[]>;
}

export interface ITransactionService {
  getAllById(id: string): Promise<Transaction[]>;
}