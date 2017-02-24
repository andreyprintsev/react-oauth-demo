import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { SET_AUTH, SET_ERROR_MESSAGE } from './constants/app-constants';
import auth from './utils/auth';

const initialState = {
  loggedIn: auth.loggedIn(),
  errorMessage: ''
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {...state, ...{loggedIn: action.newState}};
    case SET_ERROR_MESSAGE:
      return {...state, ...{errorMessage: action.message}};
    default:
      return state;
  }
}

const createStoreWithMiddleware = applyMiddleware(thunk, logger())(createStore);
const store = createStoreWithMiddleware(reducer);

export default store;
