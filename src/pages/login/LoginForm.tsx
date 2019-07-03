import * as React from 'react'
import styled from 'styled-components'
import { navigate, Link } from "@reach/router";
import { Form, Icon, Input, Button, Card } from 'antd';
import { login, LoginResponse, ErrorResponse } from '../../api/auth-api';


interface IState {
  error: string
}

const initialState = {
  error: ''
}

class LoginForm extends React.Component<any, IState> {
  public state = {
    ...initialState,
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        const { userName, password } = values;
        const response = await login({ userName, password })
        if ((response as ErrorResponse).error) {
          this.setState({ error: (response as ErrorResponse).error })
        } else {
          const { token } = response as LoginResponse
          navigate('/home');
        }
      }
    });
  };


  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Container>
        <Card title="Login" className="login-card">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
          </Button>
              <Link to="signup">Register now!</Link>
            </Form.Item>
          </Form>
        </Card>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0e1e25;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card{
    width: 25%;
    text-align: center;
  } 
  .login-form-button{
      width: 100%;
  }
  }
`
const NormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);
export default NormalLoginForm