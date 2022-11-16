import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import ILogin from '../types/login';
import { verifyDataLogin } from '../utils/functions';
import googleplay from '../images/googleplay.png';
import appStore from '../images/appstore.png';
import '../styles/login.css'

export default function Login() {
  const [loginData, setLoginData] = useState<ILogin>({ user: '', password: ''});
  const [disabled, setDisabled] = useState<boolean>(true);
  const { user, password } = loginData;

  const handleData = ({ target }: any): void => {
    setLoginData({ ...loginData, [target.name]: target.value})
  };

  const handleSubmit = (event: any) => {
    console.log('oi');
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
        <Input className="login-input" type="text" name="user" func={ handleData } />
        <Input className="login-input" type="password" name="password" func={ handleData} />
        <button className="btn draw-border" disabled={ disabled }>Login</button>
        <a className='font-noto-sans' href="/register">Register</a>
      </form>
    </div>
  )
}