export function createStore(reducer, enhancer) {
  if(enhancer) {
    // 返回一个加强版的store
    return enhancer(createStore)(reducer)
  }
  let currentState = undefined
  let currenListens = []

  function getState() {
    return currentState
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)
    currenListens.map(listener => listener())
  }

  function subscribe(listener) {
    currenListens.push(listener)
  }

  dispatch({type: '@INIT/REDUX-KKB'})

  return {
    getState,
    dispatch,
    subscribe
  }
}

export function applyMiddleware(...middlewares) {
  // 返回enhancer
  return createStore => (...args) => {
    // 先得到基础版store
    let store = createStore(...args)
    let { getState, dispatch } = store
    const middleApi = {
      getState,
      dispatch
    }
    // 给中间件传递store的相关api参数
    const middlewaresChain = middlewares.map(middleware => middleware(middleApi))
    // 利用聚合函数执行middlewaresChain里的函数，得到新的dispatch
    const newDispatch = compose(...middlewaresChain)(dispatch)
    return {
      ...store,
      // 覆盖store的dispatch
      dispatch: newDispatch
    }
  }
}

function bindActionCreator(creator, dispatch) {
  return (...arg) => dispatch(creator(...arg))
}
export function bindActionCreators(creators, dispatch) {
  let obj = {}
  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch)
  }
  return obj
}

// 聚合函数，参数数组中的方法从后向前调用，并将返回值作为参数产传递给前一个
function compose(...funs) {
  if(funs.length === 0) {
    return arg => arg;
  }
  if(funs.length === 1) {
    return funs[0]
  }
  return funs.reduce((previousValue, currentValue) => {
    return (...args) => {
      return previousValue(currentValue(...args))
    }
  })
}

// 中间件
export function logger(middleApi) {
  return dispatch => action => {
    console.log('dispatch-logger', dispatch)
    console.log(action.type +'->执行了')
    return dispatch(action)
  }
}

export function thunk(middleApi) {
  return dispatch => action => {
    console.log('dispatch-thunk', dispatch)
    // action可以是对象，也可以扩展为函数
    if(typeof action === 'function') {
      return action(dispatch)
    } else {
      return dispatch(action)
    }
  }
}


// 帮助理解，传入聚合函数的中间件定义如下
// function logger(dispatch) {
//   return action => {
//     console.log(action.type +'->执行了')
//     return dispatch(action)
//   }
// }
// function thunk(dispatch) {
//   return action => {
//     // action可以是对象，也可以扩展为函数
//     if(typeof action === 'function') {
//       return action(dispatch)
//     } else {
//       return dispatch(action)
//     }
//   }
// }
// 以下代码等价于上面聚合函数compose(thunk,logger)(dispatch)
// const newDispatch = thunk(logger(dispatch))
// newDispatch(action)
// 这里thunk如果是applyMiddleware中第一个中间件，则它接收的action是项目代码中直接传入的那个
// 而logger(dispatch)接收的是原始的dispatch函数，返回值就是一个新函数
// action => {
//   console.log('dispatch-logger', dispatch);
//   console.log(action.type + '->执行了');
//   return dispatch(action);
// }
// 这个函数作为参数dispatch传给前一个中间件thunk，因此thunk函数中的dispatch就是logger返回的函数，返回的函数newDispatch在项目中直接调用了
// 所以执行顺序就是第一个中间件返回的函数newDispatch开始从项目中接收action，判断action类型，执行后一个中间件返回的函数，如果后面还有中间件，以此类推，直到最后一个接收原始的dispatch函数
