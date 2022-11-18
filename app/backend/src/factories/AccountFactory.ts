import AccountRepository from '../repositories/AccountRepository';
import AccountService from '../services/AccountService';
import AccountController from '../controllers/AccountController';

export default () => {
  const model = new AccountRepository();
  const service = new AccountService(model);
  const controller = new AccountController(service);

  return controller;
};
