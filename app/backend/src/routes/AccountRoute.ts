import { Router } from 'express';
import AccountFactory from '../factories/AccountFactory';

const router = Router();

router.get('/balance/:accountId',
  (req, res) => AccountFactory().getBalance(req, res));

router.post('/transfer', (req, res) => AccountFactory().transfer(req, res));

export default router;