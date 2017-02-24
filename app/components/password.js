import React from 'react';

export default class Password extends React.Component
{
  render() {
    return <div><label>{this.props.label}</label><input type='password' value={this.props.value}
      placeholder={this.props.placeholder} onChange={this.props.onChange}/></div>
  }
}
