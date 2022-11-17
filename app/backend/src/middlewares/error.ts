import { ErrorRequestHandler } from 'express';
import { errorCatalog, ErrorTypes } from '../error/catalog';

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next,
) => {

  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    const { httpStatus, error } = mappedError;
    return res.status(httpStatus).json({ error });
  }
  console.log(err);

  return res.status(500).json({ message: err.message });
};

export default errorHandler;