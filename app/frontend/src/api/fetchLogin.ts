import ILogin from '../types/login';

export const tryLogin = async (data: ILogin) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch('http://localhost:3001/login', requestOptions);
  return response.json();
}

