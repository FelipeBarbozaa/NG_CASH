import React from 'react';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';
import Register from './pages/Register';
import './styles/app.css'
import Home from './pages/Home';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={ <PrivateRoute /> }>
          <Route path="/" element={ <Home /> } />
        </Route>
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
      </Switch>
  </BrowserRouter>
  );
}

export default App;
