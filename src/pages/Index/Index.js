import './Index.scss';
import React, { Component, Suspense } from 'react';
// import { withRouter } from 'react-router';
import { Switch, HashRouter } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { renderRoutes } from 'react-router-config'
import { Layout, Breadcrumb, Row, Col, Dropdown, Menu, Button } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
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

const Index = (props) => {
    const userinfo = JSON.parse(sessionStorage.getItem('userinfo')) || {}
    const menu = (
        <Menu>
          <Menu.Item key="0">
          <Button type="primary" size="small" onClick={() => { console.log('修改密码')}}>修改密码</Button>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="1">
          <Button type="primary" size="small" onClick={() => { props.history.push('/')}}>退出登录</Button>
          </Menu.Item>
        </Menu>
      );
    const { Header, Content, Sider } = Layout;
    const { SubMenu } = Menu;
    function handleMenuClick(obj) {
        console.log(obj)
        props.history.push(obj.key)
    }
    console.log(props.location.pathname)
    return(
        <Layout className="index-wrap">
            <Header>
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
            </Header>
            <Layout>
                <Sider width={200}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["/index/message"]}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={handleMenuClick}
                        >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="动态中心">
                            <Menu.Item key="/index/message">消息</Menu.Item>
                            <Menu.Item key="/index/contact">通讯录</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined />} title="账号管理">
                            <Menu.Item key="/index/demo">demo</Menu.Item>
                            <Menu.Item key="/index/demo1">demo1</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<LaptopOutlined />} title="开课吧学习demo">
                            <Menu.Item key="/index/HocPage">高阶组件</Menu.Item>
                            <Menu.Item key="/index/FormPage">表单装饰器</Menu.Item>
                            <Menu.Item key="/index/kFormCreateDemo">自定义表单装饰器</Menu.Item>
                            <Menu.Item key="/index/DialogPage">传送门实现弹窗组件</Menu.Item>
                            <Menu.Item key="/index/ContextPage">上下文</Menu.Item>
                            <Menu.Item key="/index/ReduxPage">redux</Menu.Item>
                            <Menu.Item key="/index/ReactReduxPage">react-redux</Menu.Item>
                        </SubMenu>
                    </Menu> 
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                        >
                        <HashRouter>
                            <Suspense fallback={<Loading />}>
                                <Switch>
                                    {renderRoutes(props.route.children)}
                                </Switch>
                            </Suspense>
                        </HashRouter>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
// export default withRouter(Index) // 通过路由跳转过来的不用使用withRouter
export default Index