import { IAccountModel, IAccountService } from '../interfaces/Balance';

export default class AccountService implements IAccountService {
  constructor(private model: IAccountModel) {}

  async getBalance(accountId: string): Promise<number | null> {
    const response = await this.model.getBalance(accountId);
    return response;
  }
}