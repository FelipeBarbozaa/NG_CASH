import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import validateToken from '../api/fetchValidateToken';

const PrivateRoute = () => {
  const [auth, setAuth] = useState(true);
  const token = localStorage.getItem('token') as string;

  useEffect(() => {
    const isAuthentication = async () => {
      const token = localStorage.getItem('token') as string;
      const response = await validateToken(token);
      return response;
    };
    isAuthentication().then((response) => setAuth(response.status === 200))
  }, [token])

  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;