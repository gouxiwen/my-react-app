import { createStore, combineReducers, applyMiddleware } from 'redux';
//引入中中间件
import logger from "redux-logger"
import thunk from "redux-thunk"
// import { createStore, applyMiddleware, logger, thunk } from '../kRedux'; // 自己实现的redux


function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}
const initUser = {
  isLogin: false,
  userInfo: {}
}
function userReducer(state = {...initUser}, action) {
  switch (action.type) {
    case "LOGIN_SUCESS":
      return {
        isLogin: true,
        userInfo: {}
      };
    case "LOGOUT_SUCESS":
      return {
        isLogin: false,
        userInfo: {}
      };
    default:
      return state;
  }
}

// const store = createStore(countReducer, applyMiddleware(thunk, logger))
// combineReducers可以绑定多个reducer，使用的时候用store.getState().count
const store = createStore(combineReducers({count: countReducer, user: userReducer}), applyMiddleware(thunk, logger))
export default store; 