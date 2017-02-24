import React from 'react';

class Text extends React.Component
{
  render() {
    return <div>
      <label>{this.props.label}</label>
      <div><input type='text' value={this.props.value} placeholder={this.props.placeholder}
      onChange={this.props.onChange}/></div>
      {this.props.errors.length > 0 &&
        <div>
          {
            this.props.errors.map((error, idx) => { return <span key={idx} style={{display: 'block'}}>{error}</span>})
          }
        </div>
      }
    </div>
  }
}

Text.defaultProps = {
  errors: []
}

export default Text;
