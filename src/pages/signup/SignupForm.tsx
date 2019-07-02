import * as React from 'react'
import styled from 'styled-components'
import { navigate, Link } from "@reach/router";
import { Form, Icon, Input, Button, Card } from 'antd';
import { signup, SignResponse, ErrorResponse } from '../../api/auth-api';

interface IState {
  error: string
}

const initialState = {
  error: ''
}

class SignUpForm extends React.Component<any, IState> {
  public state = {
    ...initialState,
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        const { userName, email, name, password } = values;
        const response = await signup({ userName, email, name, password })
        if ((response as ErrorResponse).error) {
          this.setState({ error: (response as ErrorResponse).error })
        } else {
          const { message } = response as SignResponse
          navigate('/login');
        }
      }
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Container>
        <Card title="Sign UP" className="signUp-card">
          <Form onSubmit={this.handleSubmit} className="signUP-form">
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
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your name!' }],
              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Name" />)}
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
              <Button type="primary" htmlType="submit" className="signUP-form-button">
                Sign UP
          </Button>
              <Link to="/">Already have an account!</Link>
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
  .signUp-card{
    width: 25%;
    text-align: center;
  } 
  .signUP-form-button{
      width: 100%;
  }
  }
`
const NormalSignUpForm = Form.create({ name: 'normal_login' })(SignUpForm);
export default NormalSignUpForm