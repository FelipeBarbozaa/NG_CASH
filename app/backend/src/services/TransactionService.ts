import {
  CashOutReturn,
  ITransactionModel,
  ITransactionService,
} from '../interfaces/Transaction';

export default class TransactionService implements ITransactionService {
  constructor(private transcationModel: ITransactionModel) {}

  async getCashOutById(id: string): Promise<CashOutReturn[]> {
    const response = await this.transcationModel.getCashOutById(id);
    return response;
  }

  async getCashInById(id: string): Promise<CashOutReturn[]> {
    const response = await this.transcationModel.getCashInById(id);
    return response;
  }
}