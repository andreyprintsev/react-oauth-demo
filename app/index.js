import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

import LoginPage from './components/pages/login-page';
import DashBoard from './components/pages/dashboard';
import App from './components/app';

class Main extends React.Component
{
  render() {
    return <h1>Public page!</h1>
  }
}

function checkAuth(nextState, replace) {
  let { loggedIn } = store.getState();
  if (nextState.location.pathname === '/login') {
    if (loggedIn) {
      replace('/dashboard');
    }
  } else {
    if (!loggedIn) {
      replace('/login');
    }
  }

}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route component={App}>
        <Route path="/" component={Main} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={DashBoard} onEnter={checkAuth}/>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
