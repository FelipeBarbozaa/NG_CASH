import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import userRouter from './routes/UserRoute';
import errorHandler from './middlewares/error';
import Token from './token/token';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', userRouter);
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

export default app;
