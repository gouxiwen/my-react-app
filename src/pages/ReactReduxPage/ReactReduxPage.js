import React, { Component } from 'react';
// import {connect} from 'react-redux';
import {connect} from '../../kReactRedux';
import { bindActionCreators } from 'redux';

export default connect(
  // 三个参数：mapStateToProps, mapDispatchToProps, mergePros
  // mapStateToProps Function (state, [ownProps])
  // ! ownProps是组件本身的props，ownProps要慎用，如果ownProps变化会导致mapStateToProps重新执行，state重新计算导致性能问题
  (state, ownProps) => {
    return {
      count: state
    }
  },
  // mapDispatchToProps Function(dispatch, [ownProps])|Object
  // 不指定mapDispatchToProps，则默认props会被注入dispatch本身
  // 如果是Object，dispatch不会被注入
  // {
  //   add: () => ({type: 'ADD'})
  // },
  // 如果是Function,则返回的值注入到props
  // ! ownProps是组件本身的props，ownProps要慎用，如果ownProps变化会导致mapStateToProps重新执行，state重新计算导致性能问题
  (dispatch) => {
    let res = { add: () => ({type: 'ADD'}), minus: () => ({type: 'MINUS'}) }
    // 这里的action需要用dispatch包裹一下let res = { add: () => dispatch({type: 'ADD'}), minus: () => dispatch({type: 'MINUS'}) }
    // react-redux提供了一个bindActionCreators同一处理这个事情
    res = bindActionCreators(res, dispatch)
    return {
      dispatch,
      ...res
    }
  },
  // mergePros，可以修改上面的属性或者添加一些属性一般不用 Function(stateProps, dispatchProps, ownProps)
  (stateProps, dispatchProps, ownProps) => {
    return {
      mergeProps: 'mergeProps',
      ...stateProps, ...dispatchProps, ...ownProps
    }
  }

)(class ReactReduxPage extends Component {
  render() {
    console.log(this.props)
    const { count, dispatch, add, minus } = this.props
    return (
      <div>
        <h3>react-redux Page</h3>
        <div>{count}</div>
        <button onClick={() => dispatch({type: 'ADD'})}>use dispatch add</button>
        <button onClick={() => dispatch({type: 'MINUS'})}>use dispatch minus</button>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    );
  }
})