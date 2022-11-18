import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import ILogin from '../types/login';
import { verifyDataLogin } from '../utils/functions';
import googleplay from '../images/googleplay.png';
import appStore from '../images/appstore.png';
import '../styles/login.css'
import { tryLogin } from '../api/fetchLogin';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [loginData, setLoginData] = useState<ILogin>({ username: '', password: ''});
  const [error, setError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { username, password } = loginData;
  const navigate = useNavigate();

  const handleData = ({ target }: any): void => {
    setLoginData({ ...loginData, [target.name]: target.value})
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await tryLogin(loginData)
    if (!response.token) {
      setError(true);
      // aqui criar a mensagem de erro
    } else {
      localStorage.setItem('token', response.token)
      localStorage.setItem('id', response.id);
      localStorage.setItem('accountId', response.accountId);
      navigate('/');
    }
  };

  // Verifica as credenciais para ativar o botão de login
  useEffect(() => {
    if (verifyDataLogin(username, password)) {
      setDisabled(false);
    } else {
      setDisabled(true);  
    }
  }, [username, password]);

  return (
    <div className='login-container'>
      <section className='section-login'>
      <h1 className="font-noto-sans">A CARTEIRA DA NOVA GERAÇÂO</h1>
      <h2 className="font-noto-sans">É para todas as idades!</h2>
      <a
        href="https://play.google.com/store/apps/details?id=com.neaglebank"
        target="_blank"
        rel="noreferrer"
      >
        <img className="app-image" alt="googlePlay" src={ googleplay } />
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.neaglebank"
        target="_blank"
        rel="noreferrer"
      >
        <img className="app-image" alt="appStore" src={ appStore } />
      </a>
      </section>
      <form className='form-login' onSubmit={(event) => handleSubmit(event) }>
        {error ? <p className="font-noto-sans error-message">User or password incorrect</p> : null}
        <Input className="login-input" type="text" name="username" func={ handleData } />
        <Input className="login-input" type="password" name="password" func={ handleData} />
        <button className="btn draw-border" disabled={ disabled }>Login</button>
        <a className='font-noto-sans' href="/register">Register</a>
      </form>
    </div>
  )
}