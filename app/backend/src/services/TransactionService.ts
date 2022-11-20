import Transaction from '../database/models/Transaction';
import {
  ITransactionModel,
  ITransactionService,
} from '../interfaces/Transaction';

export default class TransactionService implements ITransactionService {
  constructor(private transcationModel: ITransactionModel) {}

  async getAllById(id: string): Promise<Transaction[]> {
    const response = await this.transcationModel.getAllById(id);
    return response;
  }
}
