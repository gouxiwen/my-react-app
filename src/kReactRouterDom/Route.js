import React, { Component } from 'react';
import {RouterContext} from './RouterContext';
import matchPath from './matchPath'; // 这里使用源码的匹配函数

class Router extends Component {
  render() {
    return <RouterContext.Consumer>
      {context => {
        const { path, children, component, render } = this.props
        // Route有三种渲染模式，children，component，render，渲染后的组件都能接收到（history，location，match）
        // 所以需要定义在props中传递下去
        const location = this.props.location || context.location
        // const match = context.location.pathname === path //简单版match
        const match = matchPath(location.pathname, this.props) // 完整版match
        const props = {
          ...context,
          location,
          match
        }
        // return match ? React.createElement(component, this.props) : null;
        // 如果match，按照优先级渲染children，component，render，
        // 如果没有match，渲染children或者null
        return <RouterContext.Provider value={props}>
          {
            match ? 
            (children ? (typeof children === 'function' ? children(props) : children) :
            (component ? React.createElement(component, props) :
            (render ? render(props) : null))) :
            typeof children === 'function' ? children(props) : null

          }
        </RouterContext.Provider>

      }}
    </RouterContext.Consumer>
  }
}

export default Router;
