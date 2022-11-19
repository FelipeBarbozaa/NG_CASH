export enum ErrorTypes {
  InvalidLogin = 'InvalidLogin',
  UserExists = 'UserExists',
  InsufficientMoney = 'InsufficientMoney'
}

type ErrorResponseObject = { 
  error: string;
  httpStatus: number
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
  InvalidLogin: {
    error: 'User or password incorrect',
    httpStatus: 404,
  },
  UserExists: {
    error: 'User already exists',
    httpStatus: 409,
  },
  InsufficientMoney: {
    error: 'You do not have enough money',
    httpStatus: 400,
  }
};