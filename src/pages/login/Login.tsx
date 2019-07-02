import * as React from 'react'
import NormalLoginForm from './LoginForm'
import { withRouter } from 'react-router-dom';

class LoginPage extends React.Component<any> {


  public render() {
    return (
      <>
      <NormalLoginForm />
      </>
    );
  }
}



export default LoginPage