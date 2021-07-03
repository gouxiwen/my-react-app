import React, { Component } from 'react';
// import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';
import BrowserRouter from '../../kReactRouterDom/BrowserRouter';
import Route from '../../kReactRouterDom/Route';
import Switch from '../../kReactRouterDom/Switch';
import Link from '../../kReactRouterDom/Link';
import homePage from './pages/HomePage';
import userPage from './pages/userPage';
import PrivateRoute from './pages/PrivateRoute';
import loginPage from './pages/LoginPage';

function SearchPage(props) {
  const {id} = props.match.params
  return (
    <div>SearchPage-id{id}</div>
  )
}

class ReactRouterPage extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Link to="/">首页</Link>|
          <Link to="/user">用户中心</Link>|
          <Link to="/children">children</Link>|
          <Link to="/render">render</Link>|
          <Link to="/search/123">SearchPage</Link>|
          <Link to="/login">登录</Link>
          <Switch>
            <Route exact path="/" component={homePage}></Route>
            {/* <Route path="/user" component={userPage}></Route> */}
            <Route path="/children" children={() => <div>children</div>}></Route>
            <Route path="/render" render={() => <div>render</div>}></Route>
            <Route path="/search/:id" component={SearchPage}></Route>
            {/* <Route children={() => <div>404</div>}></Route> */}
            {/* 路由守卫 */}
            <PrivateRoute path="/user" component={userPage}></PrivateRoute>
            <Route path="/login" component={loginPage}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default ReactRouterPage;
