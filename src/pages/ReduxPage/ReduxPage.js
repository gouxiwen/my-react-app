import React, { Component } from 'react';
import store from '../../store';

class ReduxPage extends Component {
  componentDidMount() {
    // 订阅store，每次派发时执行回调
    store.subscribe(() => {
      this.forceUpdate()
    })
  }
  add = () => {
    // 派发store
    // store.dispatch({type: 'ADD'})
    // 异步操作，使用redux-thunk以后
    store.dispatch(dispatch => {
      setTimeout(() => {
        dispatch({type: 'ADD'})
      }, 1000);
    })
  }
  minus = () => {
    store.dispatch({type: 'MINUS'})
  }
  render() {
    console.log('store', store)
    return (
      <div>
        <h3>ReduxPage</h3>
        {/* 获取store */}
        <p>{store.getState()}</p>
        {/* <p>{store.getState().count}</p> */}
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
      </div>
    );
  }
}

export default ReduxPage;
