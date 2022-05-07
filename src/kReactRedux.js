import React, { Component, useContext, useEffect, useState } from "react";
// import { bindActionCreators } from 'redux'
import { bindActionCreators } from "./myRedux";
const Valuecontext = React.createContext();

export const connect =
  (
    mapStateToProps = (state) => ({ state }),
    mapDispatchToProps
    // mergePros // 没有实现
  ) =>
  (WrapComponent) => {
    //   最新源码返回的是函数组件，最终调用react的useSyncExternalStore hooks实现订阅和更新数据，这里用类组件说明原理
    return class extends Component {
      static contextType = Valuecontext;
      constructor() {
        super();
        this.state = {
          props: {},
        };
      }

      componentDidMount() {
        const { subscribe } = this.context;
        this.update();
        // 订阅store更新
        this.unsubscribe = subscribe(() => {
          // 源码中利用快照和最新的value比较，判断state是否变化，防止重复更新
          this.update();
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      update() {
        const { dispatch, getState } = this.context;
        let dispatchProps;
        let stateProps = mapStateToProps(getState());
        if (typeof mapDispatchToProps === "object") {
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        } else if (typeof mapDispatchToProps === "function") {
          dispatchProps = mapDispatchToProps(dispatch);
        } else {
          // 默认
          dispatchProps = { dispatch };
        }
        this.setState({
          props: {
            ...dispatchProps,
            ...stateProps,
          },
        });
      }

      render() {
        return <WrapComponent {...this.state.props} />;
      }
    };
  };

export function useSelector(fn = (state) => ({ state })) {
  // 源码中是通过调用react的useSyncExternalStoreWithSelector hooks包装selector，并最终调用useSyncExternalStore实现订阅和更新数据，和connect一致
  const { getState, subscribe } = useContext(Valuecontext);
  const [, setstate] = useState(0);
  useEffect(() => {
    const unsubscribe = subscribe(() => {
      // 源码中利用快照和最新的value比较，判断state是否变化，防止重复更新
      setstate((v) => v + 1);
    });
    return () => {
      unsubscribe();
    };
  }, [subscribe]);
  return fn(getState());
}

export function useDispatch() {
  const { dispatch } = useContext(Valuecontext);
  return dispatch;
}

export class Provider extends Component {
  render() {
    return (
      <Valuecontext.Provider value={this.props.store}>
        <div>{this.props.children}</div>
      </Valuecontext.Provider>
    );
  }
}
