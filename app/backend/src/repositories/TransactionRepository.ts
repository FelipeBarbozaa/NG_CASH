import { Op } from 'sequelize';
import Transaction from '../database/models/Transaction';
import { ITransactionModel } from '../interfaces/Transaction';

export default class TransactionRepository implements ITransactionModel {
  constructor(private model = Transaction) {}

  async getAllById(id: string): Promise<Transaction[]> {
    const response = await this.model.findAll(
      { where: {
        [Op.or]: [
          { debitedAccountId: id },
          { creditedAccountId: id }
        ]
      }}
    );
    return response;
  }
}
