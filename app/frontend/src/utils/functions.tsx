import { USER_MIN_LENGTH } from "./number"

export const verifyDataLogin = (login: string, password: string): boolean => {
  const regex = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/
  return login.length >= USER_MIN_LENGTH && regex.test(password); 
}

export const verifyRegisterLogin = (login: string, password: string, repassword: string) => {
  const regex = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/
  return login.length >= USER_MIN_LENGTH && regex.test(password) && password === repassword;
}