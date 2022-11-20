import { Router } from 'express';
import TransactionFactory from '../factories/TransactionFactory';

const route = Router();

route.get('/transactions/:id',
  (req, res) => TransactionFactory().getAllById(req, res));

export default route;