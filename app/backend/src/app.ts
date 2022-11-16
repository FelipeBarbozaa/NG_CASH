import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import User from './database/models/User';
import Account from './database/models/Account';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/teste', (req, res) => res.send('okay'));
app.get('/balances', async (req, res) => {
  const result = await Account.findAll();
  return res.status(200).json(result);
});

app.get('/users', async (req, res) => {
  const result = await User.findAll();
  console.log(result);
  return res.status(200).json(result);
});

export default app;
