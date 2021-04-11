import React, { Component } from 'react';
import kFormCreate from '../../utils/kFormCreate.js';
import { regExpConfig } from '../../utils/regExp.config'

const namerules = [
  { required: true, message: '用户名为空' },
  { pattern: regExpConfig.policeNo, message: '账号4-10位数字或字母组成' }
]
const passrules = [
  { required: true, message: '密码为空' },
  { pattern: regExpConfig.pwd, message: '密码由6-16位数字或者字母组成' }
]

// 装饰器将被装饰的组件传入，进行一些加工，添加属性方法等，然后返回一个新组件
@kFormCreate
class kFormCreateDemo extends Component {
  submit = () => {
    const { getFiedlesValue, validateFields } = this.props
    console.log(getFiedlesValue())
    validateFields()
    .then(values => {
      console.log('验证通过', values)
    })
    .catch(err => {
      console.error('错误', err)
    })
  }
  render() {
    console.log('render', this.props)
    const { getFieldDecorator } = this.props
    return (
      <div>
        <h3>myFormPage kFormCreate</h3>
        {getFieldDecorator(
          'name', {
            rules: namerules
          }
          )(<input type="text" placeholder="请输入姓名"/>)}
        {getFieldDecorator(
          'password', {
            rules: passrules
          }
        )(<input type="password" placeholder="请输入密码"/>)}
        <button onClick={this.submit}>提交</button>
      </div>
    );
  }
}

export default kFormCreateDemo;
