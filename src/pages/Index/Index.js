import './Index.scss';
import React, { Component, Suspense } from 'react';
// import { withRouter } from 'react-router';
import { Switch, HashRouter } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { renderRoutes } from 'react-router-config'
import { Row, Col, Dropdown, Menu, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// class Index extends Component {
//     constructor(props) {
//         super();
//         this.state = {
//             route: props.route,
//         }
//     }

//     render() {
//         const route = this.state.route;
//         return (
//             <div className="index-wrap">
//                 <div className="top-bar">
//                     <div
//                     className="nav"
//                     onClick={
//                         () => {this.props.history.push('/index/message')}
//                     }
//                     >消息</div>
//                     <div
//                     className="nav"
//                     onClick={
//                         () => {this.props.history.push('/index/contact')}
//                     }
//                     >通讯录</div>
//                     <div
//                     className="nav"
//                     onClick={
//                         () => {this.props.history.push('/index/demo')}
//                     }
//                     >demo</div>
//                     <div
//                     className="nav"
//                     onClick={
//                         () => {this.props.history.push('/index/demo1')}
//                     }
//                     >demo1</div>
//                 </div>
//                 <div className="main">
//                 <HashRouter>
//                     <Suspense fallback={<Loading />}>
//                         <Switch>
//                         {renderRoutes(route.children)}
//                         </Switch>
//                     </Suspense>
//                     </HashRouter>
//                 </div>
//             </div>
//         )
//     }
// }

const Index = () => {
    const userinfo = JSON.parse(sessionStorage.getItem('userinfo')) || {}
    const menu = (
        <Menu>
          <Menu.Item key="0">
          <Button type="primary" size="small" onClick={() => { console.log('修改密码')}}>修改密码</Button>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="1">
          <Button type="primary" size="small" onClick={() => { console.log('退出登录')}}>退出登录</Button>
          </Menu.Item>
        </Menu>
      );
    return(
        <div className="index-wrap">
            {/* <header className="top-bar"> */}
                <Row className="top-bar">
                    <Col span={20}>
                        <div className="logo"></div>
                        <div className="top-menus"></div>
                    </Col>
                    <Col span={4}>
                    <Dropdown overlay={menu} arrow>
                        <div className="user-info"><UserOutlined />{userinfo.chineseName || userinfo.username}</div>
                    </Dropdown>
                    </Col>
                </Row>
            {/* </header> */}
        </div>
    )
}
// export default withRouter(Index) // 通过路由跳转过来的不用使用withRouter
export default Index