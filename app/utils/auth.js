import axios from 'axios';
import * as errorMessages from './../constants/message-constants';

function encodeObjectAsURLForm(data) {
  return Object.keys(data).map((k) => {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

var auth = {
  login(username, password, callback) {

    if (this.loggedIn()) {
      callback(true);
      return;
    }

    let data = encodeObjectAsURLForm({
      grant_type: 'password',
      client_id: 'my-trusted-client',
      username: username,
      password: password
    })

    axios({
      method: 'post',
      url: 'http://localhost:8081/oauth/token',
      data: data,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
    .then((response) => {
      let data = response.data;
      if (data.access_token) {
        localStorage.access_token = data.access_token;
        localStorage.refresh_token = data.refresh_token;
        callback(true);
      } else {
        callback(false, {type: 'bad_credentials'})
      }
    })
    .catch((response) => {
      if (response.response === undefined) {
        callback(false, {type: 'service_unavailible'});
        return;
      }
      let data = response.response.data;
      callback(false, {type: 'bad_credentials'})
    })

  },

  logout(callback) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    callback(true);
  },

  loggedIn() {
    //console.log('check loggedIn');
    return !!localStorage.access_token;
  }
}

module.exports = auth;
