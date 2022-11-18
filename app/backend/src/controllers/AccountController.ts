import { Request, Response } from 'express';
import { IAccountService } from '../interfaces/Balance';

export default class AccountController {
  constructor(private accountService: IAccountService) {}

  async getBalance(req: Request, res: Response) {
    const { accountId } = req.params;
    const response = await this.accountService.getBalance(accountId);
    return res.status(200).json(response);
  }
}