import auth from './../../utils/auth';
import { SENDING_REQUEST, SET_AUTH, SET_ERROR_MESSAGE } from './../../constants/app-constants';
import { browserHistory, hashHistory } from 'react-router';
import * as errorMessages from './../../constants/message-constants';

export function login(username, password) {
  return (dispatch) => {
    dispatch(sendingRequest(true));
    dispatch(setErrorMessage(''));
    auth.login(username, password, (success, err) => {
      dispatch(sendingRequest(false));
      dispatch(setAuthState(success));
      if (success === true) {
        forwardTo('/dashboard')
      } else {
        switch (err.type) {
          case 'service_unavailible':
            dispatch(setErrorMessage(errorMessages.SERVICE_UNAVAILIBLE));
            return;
          case 'bad_credentials':
            dispatch(setErrorMessage(errorMessages.BAD_CREDENTIALS));
            return;
          default:
            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
            return
        }

      }
    })
  }
}

export function logout() {
  return (dispatch) => {
    dispatch(sendingRequest(true));
    auth.logout((success, err) => {
      if (success === true) {
        dispatch(sendingRequest(false))
        dispatch(setAuthState(false));
        forwardTo('/')
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
      }
    });
  }
}

/**
 * Sets the authentication state of the application
 * @param {boolean} newState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newState) {
  return { type: SET_AUTH, newState };
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

function forwardTo(location) {
  console.log('forwardTo(' + location + ')');
  hashHistory.push(location);
}

function setErrorMessage(message) {
  return (dispatch) => {
    dispatch({ type: SET_ERROR_MESSAGE, message });
  }
}
