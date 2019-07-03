import React from 'react';
import { Router } from '@reach/router';
import LoginPage from './pages/login/Login';
import SignUpPage from './pages/signup/Signup'
import HomePage from './pages/home/home'

import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <LoginPage path={'/'} />
        <LoginPage path={'/login'} />
        <SignUpPage path={'/signup'} />
        <HomePage path={'/home'}/>
      </Router>
    </>
  );
}


export default App;
