import { Request, Response } from 'express';
import { ITransactionService } from '../interfaces/Transaction';

export default class TransactionController {
  constructor(private transactionService: ITransactionService) {}

  async getAllById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.transactionService.getAllById(id);
    return res.status(200).json(response);
  }
}