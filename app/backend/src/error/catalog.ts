export enum ErrorTypes {
  InvalidLogin = 'InvalidLogin',
  UserExists = 'UserExists'
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
    error: 'Email or password incorrect',
    httpStatus: 404,
  },
  UserExists: {
    error: 'User already exists',
    httpStatus: 409,
  }
};