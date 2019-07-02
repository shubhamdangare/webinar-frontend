import * as React from 'react'
import { RouteComponentProps, navigate } from '@reach/router';

interface IState {
  token: string | null
}

// to avoid first render when @method componentDidMount hasn't been called yet
const INITIAL_TOKEN = 'initial_token'

class AuthRoutes extends React.Component<RouteComponentProps, IState> {
  public state = {
    token: INITIAL_TOKEN,
  }

  public componentDidMount(): void {
    const token = window.localStorage.getItem('token');
    this.setState({ token })
  }

  public render() {
    const { token } = this.state
    if (token === INITIAL_TOKEN) {
      return null
    }
    if (!token) {
      navigate('/login')
      return <h1>Unauthorized</h1>
    }
    return this.props.children
  }
}

export default AuthRoutes
