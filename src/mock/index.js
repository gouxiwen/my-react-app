import Mock from 'mockjs';
import API from '../utils/api';
// import data from './data'

// 登录
Mock.mock(API.LOGIN, 'post', (options) => {
    let body = JSON.parse(options.body) 
    return {
      status: 200,
      message: '登录成功',
      data: body
    }
  })