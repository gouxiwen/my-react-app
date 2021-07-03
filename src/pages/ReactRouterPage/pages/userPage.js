import React, { Component } from 'react';
import {connect} from 'react-redux';

class userPage extends Component {
  render() {
    const { logout } = this.props
    return (
      <div>
        user
        <button onClick={logout}>退出登录</button>
      </div>
    );
  }
}

export default connect(
  ({user}) => {
    return {
      isLogin: user.isLogin
    }
  },
  {
    logout:() => ({type: "LOGOUT_SUCESS"}),
  }
)(userPage);
