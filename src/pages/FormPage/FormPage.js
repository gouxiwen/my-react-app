import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

const namerules = [
  { required: true, message: '用户名为4-10个字符' },
]
const passrules = [
  { required: true, message: '密码为6-16个字符' },
]

// @Form.create({}) antd v4中已弃用，不能再通过@Form.create({})和this.props.form获取antd表单
// 使用formRef = React.createRef()和this.formRef.current代替,name.rules等属性移植到Form.Items上
class FormPage extends Component {
  formRef = React.createRef();
  constructor(props) {
    super()
    // this.submit = this.submit.bind(this) // 绑定组件实例或者使用箭头函数
  }
  submit = () => {
    let form = this.formRef.current
    console.log(form.getFieldsValue())
    form.validateFields()
    .then(values => {
      console.log('通过验证', values)
    })
    .catch(err => {
      console.log('错误', err)
    })
  }
  render() {
    return (
      <div>
        <div>Formpage</div>
        <Form ref={this.formRef}>
          <Form.Item
           name="name"
           rules={namerules}>
            <Input placeholder="请输入姓名"></Input>
          </Form.Item>
          <Form.Item
           name="password"
           rules={passrules}>
            <Input placeholder="请输入密码"></Input>
          </Form.Item>
          <Button type="primary" onClick={this.submit}>提交</Button>
        </Form>
      </div>
    );
  }
}

export default FormPage;
