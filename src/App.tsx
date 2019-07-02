import React from 'react';
import { Router } from '@reach/router';
import LoginPage from './pages/login/Login';
import SignUpPage from './pages/signup/Signup'

import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <LoginPage path={'/'} />
        <LoginPage path={'/login'} />
        <SignUpPage path={'/signup'} />
      </Router>
    </>
  );
}


export default App;
