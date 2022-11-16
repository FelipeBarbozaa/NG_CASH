import React from 'react';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes as Switch, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import './styles/app.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={ <Navigate to="/login" />} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
      </Switch>
  </BrowserRouter>
  );
}

export default App;
