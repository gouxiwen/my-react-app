import React, { Component } from 'react';
import {RouterContext} from './RouterContext';

class Redirect extends Component {
  render() {
    return <RouterContext.Consumer>
      {context => {
        const {history} = context
        // to可以是对象也可以是字符串，如果是字符串需要处理成对象的醒睡，这里只处理对象的情况
        const {to} = this.props
        return <LifeCycle onMount={() => history.push(to)} />
      }}
    </RouterContext.Consumer>;
  }
}

class LifeCycle extends Component {
  componentDidMount() {
    if(this.props.onMount) {
      this.props.onMount()
    }
  }
  render() {
    return null;
  }
}


export default Redirect;
