import React, { Component } from 'react';
import {connect} from 'react-redux';
// import { Redirect, Route } from 'react-router-dom';
import Route from '../../../kReactRouterDom/Route';
import Redirect from '../../../kReactRouterDom/Redirect';
import userPage from './userPage';

class PrivateRoute extends Component {
  render() {
    console.log(this.props)
    const { isLogin, path } = this.props
    if(isLogin) { 
      return <Route path={path} component={userPage} />;
    } else {
      return <Redirect to={{pathname: '/login', state: {redirect: path}}} />;
    }
  }
}

export default connect(
  ({user}) => {
    return {
      isLogin: user.isLogin
    }
  }
)(PrivateRoute);
