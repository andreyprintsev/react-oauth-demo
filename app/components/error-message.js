import React from 'react';
import { connect } from 'react-redux';

let ErrorMessage = (props) => {
  return (
    props.errorMessage ?
      <div>{props.errorMessage}</div>
      : <div></div>
  )
}

function select(state) {
  return {
    errorMessage: state.errorMessage
  }
}

export default connect(select)(ErrorMessage);
