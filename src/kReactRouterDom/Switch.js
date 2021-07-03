import React, { Component } from 'react';
import {RouterContext} from './RouterContext';
import matchPath from './matchPath'; // 这里使用源码的匹配函数

class Switch extends Component {
  render() {
    return <RouterContext.Consumer>
      {context => {
        // 找出渲染的，第一个符合条件的元素
        const location  = this.props.location || context.location
        const { children } = this.props
        let element, match = null
        React.Children.forEach(children, child => {
          if(match === null && React.isValidElement(child)) {
            element = child
            const path = child.props.path
            match = path ? matchPath(location.pathname, {...child.props, path}) : context.match
          }
        })
        return match ? React.cloneElement(element, {location}) : null
      }}
    </RouterContext.Consumer>;
  }
}

export default Switch;
