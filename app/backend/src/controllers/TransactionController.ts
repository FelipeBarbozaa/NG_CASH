import { Request, Response } from 'express';
import { ITransactionService } from '../interfaces/Transaction';

export default class TransactionController {
  constructor(private transactionService: ITransactionService) {}

  async getCashOut(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.transactionService.getCashOutById(id);
    return res.status(200).json(response);
  }

  async getCashIn(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.transactionService.getCashInById(id);
    return res.status(200).json(response);
  }}