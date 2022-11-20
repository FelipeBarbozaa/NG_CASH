import { Router } from 'express';
import TransactionFactory from '../factories/TransactionFactory';

const route = Router();

route.get('/cashout/:id',
  (req, res) => TransactionFactory().getCashOut(req, res));
route.get('/cashin/:id',
  (req, res) => TransactionFactory().getCashIn(req, res));

export default route;