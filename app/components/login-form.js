import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { login } from './actions/app-actions';

import Form from './form';
import Text from './text';
import Password from './password';
import ErrorMessage from './error-message';

class LoginForm extends React.Component
{
  constructor(state) {
    super(state);
    this.state = {
      login: '',
      password: '',
      errors: []
    }
  }

  onLoginChange = (e) => {
    this.setState({...this.state, ...{login: e.target.value}});
  }

  onPasswordChange = (e) => {
    this.setState({...this.state, ...{password: e.target.value}});
  }

  isValid = () => {
    let errors = {login: [], password: []};
    if (!this.state.login) {
      errors.login.push('Login is required');
    }
    if (!this.state.password) {
      errors.password.push('Password is required');
    }
    this.setState({...this.state, ...{errors: errors}});
    return errors.login.length === 0 && errors.password.length === 0;
  }

  onSubmit = (e) => {
    e.preventDefault(true);
    if (this.isValid()) {
      //this.props.dispatch({type: 'LOGIN', payload: axios.get('/api/auth')});
      this.props.dispatch(login(this.state.login, this.state.password));
    }
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <ErrorMessage />
        <Text label='Login' onChange={this.onLoginChange} value={this.state.login} errors={this.state.errors.login}/>
        <Password label='Password' onChange={this.onPasswordChange} errors={this.state.errors.password}/>
        <div><input type="submit"/></div>
      </Form>
    )
  }
}

function select(state) {
  return {
    data: state
  }
}

export default connect(select)(LoginForm);
