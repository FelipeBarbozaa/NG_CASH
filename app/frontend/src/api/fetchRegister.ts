import { IRegister } from "../types/register";

export default async function tryRegister(data: IRegister) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch('http://localhost:3001/register', requestOptions);
  return response.json();
}