import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import userRouter from './routes/UserRoute';
import accountRouter from './routes/AccountRoute';
import errorHandler from './middlewares/error';
import Token from './token/token';
import User from './database/models/User';
import Account from './database/models/Account';
import Transaction from './database/models/Transaction';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', userRouter);
app.use('/', accountRouter);
app.use(errorHandler);

app.post('/validate', async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const response = Token.validateToken(authorization as string);
    if (response && response.type === 'authentication') {
      return res.status(200).end();
    }
    return res.status(500).end();
  } catch (error) {
    next(error);
  }
});

app.get('/users', async (req, res) => {
  const result = await User.findAll();
  return res.status(200).json(result);
});

app.get('/accounts', async (req, res) => {
  const result = await Account.findAll();
  return res.status(200).json(result);
});

app.get('/transactions', async (req, res) => {
  const result = await Transaction.findAll();
  return res.status(200).json(result);
});

app.get('/all', async (req, res) => {
  const result = await User.findAll({include: [{
    model: Account,
    as: 'accountInfo',
  }]});
  return res.status(200).json(result);
});

export default app;
