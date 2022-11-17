import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tryRegister from '../api/fetchRegister';
import Input from '../components/Input';
import { IRegister } from '../types/register';
import { verifyRegisterLogin } from '../utils/functions';

export default function Register() {
  const [registerData, setRegisterData] = useState<IRegister>({ username: '', password: '', repassword: ''});
  const [error, setError] = useState({ show: false, message: '' })
  const [disabled, setDisabled] = useState<boolean>(true);
  const { username, password, repassword } = registerData;
  const navigate = useNavigate()

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const response = await tryRegister(registerData)
    if (!response.token) {
      setError({ show: true, message: response.error })
      // aqui criar a mensagem de erro
    } else {
      localStorage.setItem('token', response.token)
      navigate('/');
    }
  }

  const handleData = ({ target }: any) => {
    setRegisterData({ ...registerData, [target.name]: target.value })
  };

  useEffect(() => {
    if (verifyRegisterLogin(username, password, repassword)) {
      setDisabled(false);
    } else {
      setDisabled(true);  
    }
  }, [username, password, repassword]);

  return (
    <>
      <form className="form-login" onSubmit={(event) => handleSubmit(event) }>
        {error.show ? <p className="font-noto-sans error-message">{error.message}</p> : null}
        <Input className="login-input" type="text" name="username" func={ handleData } />
        <Input className="login-input" type="password" name="password" func={ handleData} />
        <Input className="login-input" type="password" name="repassword" func={ handleData} />
        <button className="btn draw-border" disabled={ disabled }>Register</button>
        <a href="/login">Login</a>
      </form>
    </>
  );
}