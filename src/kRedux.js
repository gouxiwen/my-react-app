export function createStore(reducer, enhancer) {
  if (enhancer) {
    // 返回一个加强版的store
    return enhancer(createStore)(reducer);
  }
  let currentState = undefined;
  let currentListeners = [];
  let isDispatching = false;

  function getState() {
    return currentState;
  }

  let nextListeners = currentListeners;
  // 每次添加订阅和取消订阅时需要拷贝一个新的完全隔离的数组进行操作，防止在dispatch时发生bug
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  const subscribe = (listener) => {
    let isSubscribed = true;
    // 新生成一个listener数组，以免push时影响 currentListener
    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      // 如果已经移除了就直接返回
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      // 没有移除的话，先找到位置，通过splice移除
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  };

  function dispatch(action) {
    // 防止多次dispatch请求同时改状态，一定是前面的dispatch结束之后，才dispatch下一个
    if (isDispatching) {
      throw new Error("Reducers may not dispatch actions.");
    }

    try {
      isDispatching = true;
      currentState = reducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    const listeners = (currentListeners = nextListeners);

    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
    return action;
  }

  dispatch({ type: "@INIT/REDUX-MY" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export function applyMiddleware(...middlewares) {
  // 返回enhancer
  return (createStore) =>
    (...args) => {
      // 先得到基础版store
      let store = createStore(...args);
      let { getState, dispatch } = store;
      const middleApi = {
        getState,
        dispatch,
      };
      // 给中间件传递store的相关api参数
      const middlewaresChain = middlewares.map((middleware) =>
        middleware(middleApi)
      );
      // 利用聚合函数执行middlewaresChain里的函数，得到新的dispatch
      const newDispatch = compose(...middlewaresChain)(dispatch);
      return {
        ...store,
        // 覆盖store的dispatch
        dispatch: newDispatch,
      };
    };
}

function bindActionCreator(creator, dispatch) {
  return (...arg) => dispatch(creator(...arg));
}

export function bindActionCreators(creators, dispatch) {
  let obj = {};
  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}

// 聚合函数，参数数组中的方法从后向前调用，并将返回值作为参数产传递给前一个
function compose(...funs) {
  if (funs.length === 0) {
    return (arg) => arg;
  }
  if (funs.length === 1) {
    return funs[0];
  }
  return funs.reduce((previousValue, currentValue) => {
    return (...args) => {
      return previousValue(currentValue(...args));
    };
  });
}

// 中间件
export function logger(middleApi) {
  return (dispatch) => (action) => {
    console.group(
      `%c action %c${action.type} %c@ ${new Date().toLocaleTimeString()}`,
      "color: gray",
      "color: black",
      "color: gray"
    );

    console.log("%cprev state", "color: gray", middleApi.getState());
    console.log("%caction", "color: blue", action);
    const nextState = dispatch(action);
    console.log("%cnext state", "color: green", middleApi.getState());

    console.groupEnd();
    return nextState;
  };
}

export function thunk(middleApi) {
  return (dispatch) => (action) => {
    console.log("dispatch-thunk", dispatch);
    // action可以是对象，也可以扩展为函数
    if (typeof action === "function") {
      return action(dispatch);
    } else {
      return dispatch(action);
    }
  };
}

export function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers); // [counter1,counter2]
  return function (state = {}, action) {
    const nextState = {};
    let hasChanged = false;
    for (let index = 0; index < reducerKeys.length; index++) {
      const key = reducerKeys[index]; // counter1
      const previousStateForKey = state[key]; //{number:0}
      const reducer = reducers[key]; //counter1
      const nextStateForKey = reducer(previousStateForKey, action); // {number:0}
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
