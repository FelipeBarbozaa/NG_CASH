import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import { IRegister } from '../types/register';
import { verifyRegisterLogin } from '../utils/functions';

export default function Register() {
  const [registerData, setRegisterData] = useState<IRegister>({ user: '', password: '', repassword: ''});
  const [disabled, setDisabled] = useState<boolean>(true);
  const { user, password, repassword } = registerData;

  const handleSubmit = (event: any) => {
    event.preventDefault()
  }

  const handleData = ({ target }: any) => {
    setRegisterData({ ...registerData, [target.name]: target.value })
  };

  useEffect(() => {
    if (verifyRegisterLogin(user, password, repassword)) {
      setDisabled(false);
    } else {
      setDisabled(true);  
    }
  }, [user, password, repassword]);

  return (
    <>
      <form className="form-login" onSubmit={(event) => handleSubmit(event) }>
        <Input className="login-input" type="text" name="user" func={ handleData } />
        <Input className="login-input" type="password" name="password" func={ handleData} />
        <Input className="login-input" type="password" name="repassword" func={ handleData} />
        <button className="btn draw-border" disabled={ disabled }>Register</button>
        <a href="/login">Login</a>
      </form>
    </>
  );
}