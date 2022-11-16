import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import ILogin from '../types/login';
import { verifyDataLogin } from '../utils/functions';

export default function Login() {
  const [loginData, setLoginData] = useState<ILogin>({ user: '', password: ''});
  const [disabled, setDisabled] = useState<boolean>(true);
  const { user, password } = loginData;

  const handleData = ({ target }: any): void => {
    setLoginData({ ...loginData, [target.name]: target.value})
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  // Verifica as credenciais para ativar o botão de login
  useEffect(() => {
    if (verifyDataLogin(user, password)) {
      setDisabled(false);
    } else {
      setDisabled(true);  
    }
  }, [user, password]);

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event) }>
        <Input type="text" name="login" func={ handleData } />
        <Input type="password" name="password" func={ handleData} />
        <button disabled={ disabled }>Login</button>
      </form>
    </>
  )
}