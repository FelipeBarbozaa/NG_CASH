import TransactionRepository from '../repositories/TransactionRepository';
import TransactionService from '../services/TransactionService';
import TransactionController from '../controllers/TransactionController';

export default () => {
  const model = new TransactionRepository();
  const service = new TransactionService(model);
  const controller = new TransactionController(service);

  return controller;
};
