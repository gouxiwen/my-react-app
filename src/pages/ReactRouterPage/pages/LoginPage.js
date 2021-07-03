import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import Redirect from '../../../kReactRouterDom/Redirect';

class LoginPage extends Component {
  render() {
    console.log(this.props)
    const { isLogin, location, login } = this.props
    const { redirect = '/' } = location.state || {}
    if(isLogin) {
      return <Redirect to={{pathname:redirect}} />;
    } else {
      return (
        <div>
          <button onClick={login}>登录</button>
        </div>
      );
    }
  }
}

export default connect(
  ({user}) => {
    return {
      isLogin: user.isLogin
    }
  },
  {
    login:() => ({type: "LOGIN_SUCESS"}),
    logout:() => ({type: "LOGOUT_SUCESS"}),
  }
)(LoginPage);
