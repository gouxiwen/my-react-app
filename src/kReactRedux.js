import React, { Component } from 'react';
// import { bindActionCreators } from 'redux'
import { bindActionCreators } from './kRedux'
const Valuecontext = React.createContext()

export const connect = (
  mapStateToProps = state => ({state}),
  mapDispatchToProps,
  // mergePros // 没有实现
  ) => (WrapComponent) => {
  return class extends Component {
    static contextType = Valuecontext
    constructor() {
      super()
      this.state = {
        props: {}
      }
    }

    componentDidMount() {
      const { subscribe } = this.context
      this.update()
      // 订阅store更新
      subscribe(() => {
        this.update()
      })
    }

    update() {
      const { dispatch, getState } = this.context
      let dispatchProps;
      let stateProps = mapStateToProps(getState())
      if(typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
      } else if (typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(dispatch)
      } else {
        // 默认
        dispatchProps = { dispatch }
      }
      this.setState({
        props: {
          ...dispatchProps,
          ...stateProps
        }
      })
    }

    render() {
      return <WrapComponent {...this.state.props}/>;
    }
  }
}

export class Provider extends Component {
  render() {
    return (
      <Valuecontext.Provider value={this.props.store}>
        <div>
          {this.props.children}
        </div>
      </Valuecontext.Provider>
    );
  }
}