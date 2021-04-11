import React, { Component } from 'react';
export default Cmp => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {}
      this.options = {}
    }
    handleChange = e => {
      let { name, value } = e.target
      this.setState({[name]: value})
    }
    getFieldDecorator = (field, option) => {
      this.options[field] = option
      return InputCmp => {
        return React.cloneElement(InputCmp, {
          name: field,
          value: this.state[field] || '',
          onChange: this.handleChange
        })
      }
    }
    getFiedlesValue = () => {
      return {...this.state}
    }
    validateFields = () => {
      return new Promise((resolve, reject) => {
        for (const field in this.options) {
          if(this.options[field].rules && this.options[field].rules.length > 0) {
            this.options[field].rules.forEach(ruleObj => {
              if (ruleObj.required && !this.state[field]) {
                return reject(ruleObj.message)
              } else if (ruleObj.pattern && !ruleObj.pattern.test(this.state[field])) {
                return reject(ruleObj.message)
              }
            })
          }
        }
        resolve({...this.state})
      })
    }
    render() {
      return (
        <div>
          <Cmp
          getFieldDecorator={this.getFieldDecorator}
          getFiedlesValue={this.getFiedlesValue}
          validateFields={this.validateFields}
          ></Cmp>
        </div>
      );
    }
  }
  
  
}