import React from 'react';
import { Link } from 'react-router';
import { logout } from './actions/app-actions';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return <div>
      <Link to="login">Login</Link>
      <a href="#" className="btn btn--login btn--nav" onClick={this._logout}>Logout</a>
      { this.props.children }
    </div>
  }

  _logout = () => {
    console.log('logout');
    this.props.dispatch(logout());
  }
}

function select(state) {
  return {
    data: state
  };
}

export default connect(select)(App);
