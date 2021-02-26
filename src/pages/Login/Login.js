import './Login.scss';
import React, { useState } from 'react';
// import { withRouter } from 'react-router';
import { Form, Input, Button, Row, Col, Spin } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import bg from '../../assets/images/leftBg.jpg';
import { regExpConfig } from '../../utils/regExp.config'
import { ajaxJson } from '../../utils/axios'
import API from '../../utils/api'
// 类组件
// class Login extends Component {
//     formRef = React.createRef();
//     constructor(props) {
//         super()
//         this.state = {
//             // name: '',
//             // password: '',
//             loading: false
//         }
//         // this.handleNameChange = this.handleNameChange.bind(this)
//         // this.handlePassChange = this.handlePassChange.bind(this)
//         this.handleClick = this.handleClick.bind(this)
//     }
//     // handleNameChange(e) {
//     //     this.setState({
//     //         name: e.target.value
//     //     })
//     // }
//     // handlePassChange(e) {
//     //     this.setState({
//     //         password: e.target.value
//     //     })
//     // }
//     handleClick() {
//         console.log(this.state)
//         this.formRef.current.validateFields()
//             .then(values => {
//                console.log(values)
//                this.props.history.push('/index/message');
//             })
//             .catch(errorInfo => {
//                 console.error(errorInfo)
//             });
//     }
//     render() {
//         return (
//             <div className="login-wrap">
//                 <div className="top">
//                     <img className="login-bg" src={bg} alt="" />
//                 </div>
//                 <div className="bottom">
//                 <Row key="row0"
//                 className="btn-block"
//                 >
//                     <Col span={8} />
//                     <Col span={8}>
//                     <Spin spinning={this.state.loading}>
//                         <Form
//                         ref={this.formRef}
//                         >
//                             <Form.Item
//                             name="name"
//                             label=""
//                             rules={[
//                                 {
//                                     required: true, min: 4, max: 10, message: '用户名为4-10个字符',
//                                 },
//                                 { pattern: regExpConfig.policeNo, message: '账号4-10位数字或字母组成' },
//                             ]}
//                             >
//                             <Input
//                             allowClear
//                             placeholder="input name"
//                             // value={this.state.name}
//                             // onChange={this.handleNameChange}
//                             />
//                             </Form.Item>
//                             <Form.Item
//                             name="password"
//                             label=""
//                             rules={[
//                                 {
//                                     required: true, min: 6, max: 16, message: '密码为6-16个字符',
//                                 },
//                                 { pattern: regExpConfig.pwd, message: '密码由6-16位数字或者字母组成' },
//                             ]}
//                             >
//                             <Input.Password
//                                 allowClear
//                                 placeholder="input password"
//                                 // value={this.state.password}
//                                 // onChange={this.handlePassChange}
//                                 iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
//                             />
//                             </Form.Item>
//                             <Button type="primary" shape="round" block={true} onClick={this.handleClick}>登录</Button>
//                         </Form>
//                         </Spin>
//                         </Col>
//                         <Col span={8} />
//                     </Row>
//                 </div>
//             </div>
//         )
//     }
// }
// 函数式组件
const Login = (props) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    async function handleClick() {
        setLoading(true)
        try {
            let values = await form.validateFields()
            console.log(values)
            let res = await ajaxJson.post(API.LOGIN, values)
            console.log(res)
            sessionStorage.setItem('userinfo', JSON.stringify(values))
            setLoading(false)
            props.history.push('/index/message');
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }
    return (
        <div className="login-wrap">
            <div className="top">
                <div className="login-title">
                    <div className="zh">树洞平台后台管理系统</div> 
                    <div className="en">Tree hole management system</div>
                    </div>
                <img className="login-bg" src={bg} alt="" />
            </div>
            <div className="bottom">
            <Row key="row0"
            className="btn-block"
            >
                <Col span={8} />
                <Col span={8}>
                <Spin spinning={loading}>
                    <Form
                    form={form}
                    >
                        <Form.Item
                        name="username"
                        label=""
                        initialValue='admin'
                        rules={[
                            {
                                required: true, min: 4, max: 10, message: '用户名为4-10个字符',
                            },
                            { pattern: regExpConfig.policeNo, message: '账号4-10位数字或字母组成' },
                        ]}
                        >
                        <Input
                        allowClear
                        placeholder="input name"
                        // onChange={this.handleNameChange}
                        />
                        </Form.Item>
                        <Form.Item
                        name="password"
                        label=""
                        initialValue='123456'
                        rules={[
                            {
                                required: true, min: 6, max: 16, message: '密码为6-16个字符',
                            },
                            { pattern: regExpConfig.pwd, message: '密码由6-16位数字或者字母组成' },
                        ]}
                        >
                        <Input.Password
                            allowClear
                            placeholder="input password"
                            // onChange={this.handlePassChange}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                        </Form.Item>
                        <Button type="primary" shape="round" block={true} onClick={handleClick}>登录</Button>
                    </Form>
                    </Spin>
                    </Col>
                    <Col span={8} />
                </Row>
            </div>
        </div>
    )
}

// export default withRouter(Login); // 通过路由跳转过来的不用使用withRouter即可获得this.props.history
export default Login;